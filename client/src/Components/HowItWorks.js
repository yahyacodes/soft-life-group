import React from "react";
import { BsSearch } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";

const HowItWorks = () => {
  return (
    <main className="container mx-auto max-w-7xl py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <h2 className="md:text-4xl text-2xl max-w-lg font-bold mb-8">
          How ServiceConnect Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gray-100/60 p-8 rounded-lg">
            <div className="flex gap-4  mb-6">
              <div className=" bg-primary text-white rounded-full w-10 h-10">
                <BsSearch className="w-6 h-6 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                1. Search &amp; Discover
              </h3>
            </div>
            <p className="text-secondary">
              Enter your location and the service you need. Our smart search
              algorithm will find the best local providers near you, complete
              with ratings and reviews.
            </p>
            <a href="#" className="text-primary font-medium mt-4 flex gap-2">
              Learn More <BsChevronRight className="mt-1" />
            </a>
          </div>
          <div className="bg-gray-100/60 p-8 rounded-lg">
            <div className="flex gap-4 items-center mb-6">
              <div className="bg-green-600 text-white rounded-full w-8 h-8">
                <BsChat className="w-6 h-6 mx-auto mt-1" />
              </div>
              <h3 className="text-xl font-semibold">2. Connect &amp; Book</h3>
            </div>
            <p className="text-secondary">
              Browse through profiles, compare prices, and read reviews. When
              you find the right provider, easily connect and book their
              services directly through our platform.
            </p>
            <a href="#" className="text-primary font-medium mt-4 flex gap-2">
              Learn More <BsChevronRight className="mt-1" />
            </a>
          </div>
          <div className="bg-gray-100/60 p-8 rounded-lg">
            <div className="flex gap-4  mb-6">
              <div className=" bg-purple-600 text-white rounded-full w-10 h-10">
                <BsHandThumbsUp className="w-6 h-6 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                3. Review &amp; Recommend
              </h3>
            </div>
            <p className="text-secondary">
              After receiving the service, share your experience by leaving a
              review. Your feedback helps others make informed decisions and
              encourages quality service.
            </p>
            <a href="#" className="text-primary font-medium mt-4 flex gap-2">
              Learn More <BsChevronRight className="mt-1" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;
