// src/components/GoogleReviews.jsx
import { useState, useEffect } from 'react';

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${import.meta.env.VITE_GOOGLE_API_KEY}&fields=reviews,rating`
        );
        const data = await response.json();
        
        if (data.result?.reviews) {
          setReviews(data.result.reviews);
        } else {
          setError("No reviews found.");
        }
      } catch (err) {
        setError("Failed to fetch reviews.");
        console.error("Google API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.time} className="p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <img
              src={review.profile_photo_url || "/default-avatar.png"}
              alt={review.author_name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold">{review.author_name}</h4>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{review.text}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(review.time * 1000).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GoogleReviews;