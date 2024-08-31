import React, { useState } from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className="bg-customColor rounded-lg overflow-hidden">
      {/* Image placeholder */}
      <img
        className="w-full h-64 object-cover"
        src={service.image}
        alt={service.name}
      />

      {/* Card Content */}
      <div className="p-6">
        <Link
          to={`/service/${service.id}`}
          className="block text-xl font-semibold"
        >
          {service.name}
        </Link>

        {/* Rating & Reviews */}
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
          <span className="text-gray-600 ml-2">
            ({service.reviews ? service.reviews.length : 0} Reviews)
          </span>
        </div>

        {/* Description with Read More/Read Less */}
        <div className="mb-4">
          <p className="text-secondary">
            {isTruncated
              ? `${service.description.slice(0, 50)}...`
              : service.description}
          </p>
          <button onClick={toggleTruncate} className="text-primary text-sm">
            {isTruncated ? "Read More" : "Read Less"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
