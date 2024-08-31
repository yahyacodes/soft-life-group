import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ReviewForm = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Use either the state or the route params for serviceId
  const serviceId = location.state?.serviceId || id;

  useEffect(() => {
    if (!user) {
      // Redirect to login page if not authenticated
      navigate("/login", { state: { from: location } });
      return;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceId) {
      setError("Service ID is missing.");
      return;
    }

    const reviewData = {
      service: serviceId,
      user: 1, // Assume user ID is 1 for now; you should replace this with the actual logged-in user ID
      rating,
      comment,
    };

    console.log("Submitting review data:", reviewData);
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reviews/",
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Review submitted successfully:", response.data);
      navigate(`/service/${serviceId}`);
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        setError(
          `Failed to submit the review: ${JSON.stringify(error.response.data)}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
        setError("Request setup error.");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-xl py-8">
      <h1 className="text-2xl font-bold mb-4">Submit a Review</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select a rating</option>
            {[...Array(5)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
