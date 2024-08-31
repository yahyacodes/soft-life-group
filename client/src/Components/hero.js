import React from "react";

const Hero = () => {
  return (
    <main className="container mx-auto max-w-7xl py-16 sm:py-24 lg:py-32">
      <h1 className="lg:text-7xl md:text-5xl max-w-4xl text-3xl font-bold mb-4">
        Find Local Services Effortlessly
      </h1>
      <div className="md:flex gap-4 flex-none">
        <div>
          <p className="text-sm max-w-lg mb-8 text-secondary">
            Discover and connect with trusted professionals and services right
            in your neighborhood. Whether you need a grocery store, a motorbike
            rider, or an electrician, we've got you covered.
          </p>
        </div>

        <div className="ml-auto">
          <button className="rounded-full border-2 font-medium py-3 px-8">
            Browse All Products
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
