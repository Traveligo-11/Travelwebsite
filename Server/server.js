require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { validationResult, query } = require('express-validator');
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// ENHANCED CONFIGURATION
// ======================
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Changed from hardcoded key
const TRUSTED_PROXIES = process.env.TRUSTED_PROXIES?.split(',') || [];

// =================
// SECURITY MIDDLEWARE
// =================
app.set('trust proxy', TRUSTED_PROXIES.length ? TRUSTED_PROXIES : false);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "maps.googleapis.com"],
      connectSrc: ["'self'", "maps.googleapis.com"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

app.use(express.json({ limit: '10kb' }));
app.use(compression());
app.use(morgan(ENVIRONMENT === 'development' ? 'dev' : 'combined'));

// ==============
// CORS CONFIG
// ==============
const allowedOrigins = [
  'http://localhost:3000',
  ...(process.env.ALLOWED_ORIGINS?.split(',') || [])
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
}));

// ================
// RATE LIMITING
// ================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many requests',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

app.use('/api/', apiLimiter);

// =====================
// VALIDATION MIDDLEWARE
// =====================
const validateReviewRequest = [
  query('placeId')
    .notEmpty().withMessage('placeId is required')
    .isString().withMessage('placeId must be a string')
    .isLength({ min: 20, max: 100 }).withMessage('Invalid placeId length')
    .trim()
    .escape(),
  query('language')
    .optional()
    .isString().withMessage('Language must be a string')
    .isLength({ min: 2, max: 5 }).withMessage('Invalid language code')
];

// ======================
// GOOGLE REVIEWS ENDPOINT
// ======================
app.get('/api/google-reviews', validateReviewRequest, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array(),
      documentation: `${req.protocol}://${req.get('host')}/docs`
    });
  }

  const { placeId, language = 'en' } = req.query;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        fields: 'reviews,rating,user_ratings_total',
        key: GOOGLE_API_KEY,
        language,
        sessiontoken: req.ip // For tracking purposes
      },
      timeout: 10000,
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': `TravelApp/1.0 (${req.ip})`
      }
    });

    if (response.data.status !== 'OK') {
      return res.status(400).json({
        success: false,
        error: 'Google API Error',
        status: response.data.status,
        solution: 'Check placeId and API key validity'
      });
    }

    // Process reviews with enhanced sanitization
    const reviews = (response.data.result.reviews || [])
      .filter(review => review.text && review.rating)
      .map(review => ({
        id: review.time,
        text: review.text.replace(/[<>]/g, ''), // Basic sanitization
        rating: review.rating,
        author: review.author_name.substring(0, 50), // Limit length
        photo: review.profile_photo_url ? 
          `${review.profile_photo_url.split('=')[0]}=s128-c` : null, // Standardize photo size
        date: new Date(review.time * 1000).toISOString(),
        relative_time: review.relative_time_description
      }));

    // Cache headers with validation
    res.set({
      'Cache-Control': 'public, max-age=3600, must-revalidate',
      'ETag': `W/"${placeId}-${Date.now()}"`
    });

    res.json({
      success: true,
      data: {
        reviews,
        rating: response.data.result.rating,
        totalRatings: response.data.result.user_ratings_total,
        place_id: placeId,
        attribution: 'Powered by Google Places API'
      },
      meta: {
        count: reviews.length,
        source: 'Google Places API',
        request_id: req.id
      }
    });

  } catch (error) {
    // Enhanced error handling
    const errorResponse = {
      success: false,
      error: 'Service unavailable',
      request_id: req.id
    };

    if (error.code === 'ECONNABORTED') {
      errorResponse.error = 'Request timeout';
      res.status(408).json(errorResponse);
    } else if (error.response) {
      errorResponse.error = 'Google API Error';
      errorResponse.details = error.response.data?.error_message || 'Invalid response';
      res.status(error.response.status).json(errorResponse);
    } else {
      errorResponse.error = 'Internal Server Error';
      if (ENVIRONMENT === 'development') {
        errorResponse.stack = error.stack;
      }
      res.status(500).json(errorResponse);
    }
  }
});

// =================
// DOCUMENTATION
// =================
app.get('/docs', (req, res) => {
  res.json({
    endpoints: [
      {
        method: 'GET',
        path: '/api/google-reviews',
        description: 'Fetch Google reviews for a place',
        parameters: [
          { name: 'placeId', required: true, type: 'string', example: 'ChIJEYz5td6P4TgRR3RtM-eoN-E' },
          { name: 'language', required: false, type: 'string', example: 'en' }
        ],
        example: `${req.protocol}://${req.get('host')}/api/google-reviews?placeId=ChIJEYz5td6P4TgRR3RtM-eoN-E`
      }
    ]
  });
});

// ==============
// HEALTH CHECK
// ==============
app.get('/health', (req, res) => {
  const healthcheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    dbStatus: 'N/A',
    environment: ENVIRONMENT
  };
  
  res.status(200).json(healthcheck);
});

// ==============
// ERROR HANDLERS
// ==============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    documentation: `${req.protocol}://${req.get('host')}/docs`
  });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    ...(ENVIRONMENT === 'development' && { 
      message: err.message,
      stack: err.stack 
    })
  });
});

// ==============
// SERVER START
// ==============
const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${ENVIRONMENT} mode
  ➡️  Port: ${PORT}
  ➡️  Docs: http://localhost:${PORT}/docs
  ➡️  Health: http://localhost:${PORT}/health
  `);
});

// =================
// GRACEFUL SHUTDOWN
// =================
const shutdown = (signal) => {
  console.log(`\n${signal} received - shutting down gracefully`);
  
  server.close(() => {
    console.log('HTTP server closed');
    // Add any cleanup tasks here
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time - forcing shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
// Add to your existing server.js, right before the health check endpoint

// =====================
// FLIGHT API ENDPOINT
// =====================
const validateFlightRequest = [
  query('origin')
    .notEmpty().withMessage('Origin airport code is required')
    .isString().withMessage('Origin must be a string')
    .isLength({ min: 3, max: 4 }).withMessage('Invalid airport code length'),
  query('destination')
    .notEmpty().withMessage('Destination airport code is required')
    .isString().withMessage('Destination must be a string')
    .isLength({ min: 3, max: 4 }).withMessage('Invalid airport code length'),
  query('date')
    .optional()
    .isISO8601().withMessage('Date must be in YYYY-MM-DD format')
    .toDate()
];

app.get('/api/flights', validateFlightRequest, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array()
    });
  }

  const { origin, destination, date = new Date().toISOString().split('T')[0] } = req.query;

  try {
    // First check cache
    const cacheKey = `flights:${origin}:${destination}:${date}`;
    const cached = await cache.get(cacheKey);
    
    if (cached) {
      return res.json({
        success: true,
        data: cached,
        cached: true
      });
    }

    // Call the actual flight API
    const response = await axios.get('https://www.airiq.in/flights', {
      params: {
        origin,
        destination,
        date
      },
      headers: {
        'Authorization': `Bearer ${process.env.FLIGHT_API_KEY}`,
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    // Process flight data
    const flights = response.data.flights.map(flight => ({
      id: flight.id,
      airline: flight.airline.name,
      flightNumber: flight.flightNumber,
      origin: flight.origin.code,
      destination: flight.destination.code,
      departureTime: flight.departure.time,
      arrivalTime: flight.arrival.time,
      duration: flight.duration,
      price: flight.price.amount,
      currency: flight.price.currency,
      aircraft: flight.aircraft,
      status: flight.status
    }));

    // Cache for 1 hour
    await cache.set(cacheKey, flights, 'EX', 3600);

    res.json({
      success: true,
      data: flights,
      cached: false
    });

  } catch (error) {
    console.error('Flight API Error:', error);
    
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to fetch flight data';
    
    res.status(status).json({
      success: false,
      error: message,
      details: ENVIRONMENT === 'development' ? error.message : undefined
    });
  }
});