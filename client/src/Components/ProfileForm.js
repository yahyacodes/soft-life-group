import React, { useState } from "react";
import axios from "axios";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    location: "",
    phone_number: "",
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    axios
      .post("https://soft-life-group-1.onrender.com/profiles/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Profile created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
      });
  };

  return (
    <div className="container mx-auto max-w-xl py-24">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mt-4">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label>Avatar:</label>
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
