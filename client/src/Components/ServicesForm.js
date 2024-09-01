import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServicesForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contact_info: "",
    category: "",
    opening_hours: "",
    closing_hours: "",
    image: null, // Initialize image as null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Handle file input
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    // Log FormData entries for debugging
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    axios
      .post("http://127.0.0.1:8000/services/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Service created:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating service:", error);
      });
  };

  return (
    <div className="container mx-auto max-w-xl py-24">
      <h1 className="text-2xl font-bold mb-4">
        What service are you offering?
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label>Service Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mt-4">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label>Contact Information</label>
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label>Opening Hours</label>
          <input
            type="time"
            name="opening_hours"
            value={formData.opening_hours}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label>Closing Hours</label>
          <input
            type="time"
            name="closing_hours"
            value={formData.closing_hours}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default ServicesForm;
