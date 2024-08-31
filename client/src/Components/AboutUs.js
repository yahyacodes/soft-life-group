import React from "react";
import { BsGlobe } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsShield } from "react-icons/bs";
import AboutUsImage from "../assests/soft-life-group.png";

const AboutUs = () => {
  return (
    <main className="container mx-auto max-w-7xl py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <h2 className="md:text-4xl text-2xl max-w-md font-bold ">
          About SoftLife Group
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-secondary mb-6">
              SoftLife Group was founded in 2024 with a simple yet powerful
              mission: to revolutionize how people find and connect with local
              service providers. We believe that everyone should have easy
              access to reliable, skilled professionals in their community.
            </p>
            <p className="text-secondary mb-6">
              Our platform brings together a diverse range of services, from
              home maintenance to personal care, all in one convenient place.
              We're not just a directory; we're a community that fosters trust,
              quality, and efficiency in local services.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <BsPeople className="w-8 h-8 text-primary mr-3" />
                <span className="text-gray-800 font-semibold">
                  10,000+ Users
                </span>
              </div>
              <div className="flex items-center">
                <BsGlobe className="w-8 h-8 text-green-600 mr-3" />
                <span className="text-gray-800 font-semibold">10+ Cities</span>
              </div>
              <div className="flex items-center">
                <BsStar className="w-8 h-8 text-yellow-500 mr-3" />
                <span className="text-gray-800 font-semibold">
                  4.8 Avg. Rating
                </span>
              </div>
              <div className="flex items-center">
                <BsShield className="w-8 h-8 text-purple-600 mr-3" />
                <span className="text-gray-800 font-semibold">
                  Verified Providers
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              className="w-full h-96 object-cover rounded-lg"
              src={AboutUsImage}
              alt="About-us"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
              <p className="font-semibold">Connecting Communities</p>
              <p className="text-sm">One service at a time</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
