require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { validationResult, query } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  process.env.PRODUCTION_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Request validation middleware
const validateReviewRequest = [
  query('placeId')
    .notEmpty().withMessage('placeId is required')
    .isString().withMessage('placeId must be a string')
    .trim()
    .escape()
];

// Google Reviews Proxy Endpoint
app.get('/api/google-reviews', validateReviewRequest, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array(),
      example: `${req.protocol}://${req.get('host')}/api/google-reviews?placeId=ChIJEYz5td6P4TgRR3RtM-eoN-E`
    });
  }

  const { placeId } = req.query;

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          fields: 'reviews,rating,user_ratings_total',
          key: process.env.AIzaSyD-ALeRtrojIcBboKSUAEhqdCAco-ZI45k,
          language: 'en'
        },
        timeout: 10000,
        headers: {
          'Accept-Encoding': 'gzip'
        }
      }
    );

    if (response.data.status !== 'OK') {
      return res.status(400).json({
        success: false,
        error: 'Google API Error',
        details: response.data.error_message || 'Failed to fetch place details',
        status: response.data.status,
        solution: 'Check if the placeId is correct and API key is valid'
      });
    }

    // Transform and filter reviews
    const reviews = (response.data.result.reviews || [])
      .map(review => ({
        id: review.time,
        text: review.text,
        rating: review.rating,
        author: review.author_name,
        photo: review.profile_photo_url || null,
        date: new Date(review.time * 1000).toISOString().split('T')[0],
        relative_time: review.relative_time_description || null
      }))
      .filter(review => review.text && review.rating); // Only include reviews with text and rating

    // Cache control headers
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour cache

    res.json({
      success: true,
      data: {
        reviews,
        rating: response.data.result.rating,
        totalRatings: response.data.result.user_ratings_total,
        place_id: placeId
      },
      meta: {
        count: reviews.length,
        source: 'Google Places API'
      }
    });

  } catch (error) {
    console.error('Google Reviews Error:', error);
    
    let status = 500;
    let errorMessage = 'Internal Server Error';
    let details = null;

    if (error.response) {
      status = error.response.status;
      errorMessage = error.response.data.error_message || 'Google API Error';
      details = error.response.data;
    } else if (error.request) {
      errorMessage = 'No response from Google API';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout';
      status = 408;
    }

    res.status(status).json({ 
      success: false,
      error: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

// Health check endpoint with more details
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /api/google-reviews?placeId=YOUR_PLACE_ID',
      'GET /health'
    ]
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Google Reviews endpoint: GET /api/google-reviews?placeId=YOUR_PLACE_ID`);
  console.log(`Example Place ID: ChIJEYz5td6P4TgRR3RtM-eoN-E`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`${signal} received - shutting down gracefully`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  
  // Force shutdown after timeout
  setTimeout(() => {
    console.error('Force shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));