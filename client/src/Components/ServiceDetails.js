import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/services/${id}/`
        );
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  const handleReviewClick = () => {
    if (!user) {
      // If the user is not authenticated, redirect to login
      navigate("/login", { state: { from: `/service/${id}/review` } });
      return;
    }

    navigate(`/service/${id}/review`, { state: { serviceId: id } });
  };

  console.log(handleReviewClick);

  return (
    <div className="container mx-auto max-w-screen-lg py-16 sm:py-24 lg:py-32 text-gray-900">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <h1 className="lg:text-7xl md:text-5xl text-3xl font-bold mb-4">
            {service.name}
          </h1>
          <p className="font-medium text-secondary mb-4">
            {" "}
            {service.description}
          </p>
          <div className="flex items-center mb-4">
            {/* Star Ratings */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.356 4.165a1 1 0 00.95.69h4.387c.969 0 1.371 1.24.588 1.81l-3.557 2.582a1 1 0 00-.364 1.118l1.356 4.165c.3.921-.755 1.688-1.54 1.118l-3.557-2.582a1 1 0 00-1.175 0l-3.557 2.582c-.785.57-1.84-.197-1.54-1.118l1.356-4.165a1 1 0 00-.364-1.118L2.02 9.592c-.783-.57-.38-1.81.588-1.81h4.387a1 1 0 00.95-.69l1.356-4.165z" />
                </svg>
              ))}
            </div>
            <span className="text-secondary ml-2">
              {service.reviews.length} Reviews
            </span>{" "}
            {/* Static for demo */}
          </div>
          <div className="flex gap-4">
            <p className="text-sm text-secondary">
              <strong>Location:</strong> {service.location}
            </p>
            <p className="text-sm text-secondary">
              <strong>Category:</strong> {service.category}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-secondary font-semibold">
              {" "}
              {service.opening_hours ? service.opening_hours : "----"}
            </p>
            <p className="text-secondary font-semibold">-</p>
            <p className="text-secondary font-semibold">
              {service.closing_hours ? service.closing_hours : "----"}
            </p>
          </div>
          <button
            className="bg-primary text-white rounded-full mt-4 py-2 px-6"
            onClick={handleReviewClick}
          >
            Add Review
          </button>

          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {service.reviews.length > 0 ? (
              service.reviews.map(({ id, rating, comment, created_at }) => (
                <div key={id} className="mb-4 border-b pb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.356 4.165a1 1 0 00.95.69h4.387c.969 0 1.371 1.24.588 1.81l-3.557 2.582a1 1 0 00-.364 1.118l1.356 4.165c.3.921-.755 1.688-1.54 1.118l-3.557-2.582a1 1 0 00-1.175 0l-3.557 2.582c-.785.57-1.84-.197-1.54-1.118l1.356-4.165a1 1 0 00-.364-1.118L2.02 9.592c-.783-.57-.38-1.81.588-1.81h4.387a1 1 0 00.95-.69l1.356-4.165z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-secondary">{comment}</p>
                  <p className="text-sm text-secondary">
                    Posted on {new Date(created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <div className="border rounded-md p-2">
            <h1 className="text-2xl font-bold mb-4">
              Reach out to this businesse
            </h1>
            <button className="w-full bg-primary text-white rounded-full mt-4 py-2">
              Make a request
            </button>
          </div>
          <div className="border rounded-md p-2 mt-4">
            <p>N/A</p>
            <p className="text-xl mb-2">{service.contact_info}</p>
            <p>See location</p>
            <button className="w-full bg-primary text-white rounded-full mt-4 py-2">
              Make a request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
