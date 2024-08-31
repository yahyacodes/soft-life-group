import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileDetails = () => {
  const { id } = useParams(); // Assuming you are passing the profile id in the route
  const [profile, setProfile] = useState(null); // Initialize profile state as null
  const [loading, setLoading] = useState(true); // Initialize loading state

  const token = localStorage.getItem("access_token");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/profiles/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data); // Set the profile data
        setLoading(false); // Stop the loading state
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false); // Stop the loading state even on error
      }
    };

    fetchProfile();
  }, [id, token]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!profile) {
    return <div>Profile not found.</div>; // Handle case where profile is not found
  }

  return (
    <div>
      <h1>{profile.username ? profile.username : "No Username"}</h1>
      <p>Bio: {profile.bio || "No bio available"}</p>
      <p>Location: {profile.location || "No location available"}</p>
      <p>Phone Number: {profile.phone_number || "No phone number available"}</p>
      <img src={profile.avatar} alt="Profile Avatar" />
    </div>
  );
};

export default ProfileDetails;
