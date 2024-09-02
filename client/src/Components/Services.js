import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "./ServicesCard";
import Hero from "./hero";
import HowItWorks from "./HowItWorks";
import AboutUs from "./AboutUs";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://soft-life-group-1.onrender.com/services/")
      .then((response) => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <main>
      <Hero />
      <div className="container mx-auto max-w-7xl py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {services.map((service) => (
            <div key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
      <AboutUs />
      <HowItWorks />
    </main>
  );
};

export default Services;
