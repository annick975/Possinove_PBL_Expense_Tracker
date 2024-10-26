import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import hero from "../assets/hero.jpeg";

const LandingPage: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center px-4 md:px-8 lg:px-16">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Effortlessly Manage <br /> Your Daily Expenses <br />
          <span className="text-5xl md:text-6xl lg:text-7xl font-bold">
            Online
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Unlock financial freedom by efficiently tracking and organizing your
          daily expenses. Stay informed about your spending habits, set budgets,
          and achieve more.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-600 transition duration-300">
            Join Now
          </button>
          <Link to="/add-expense">
            {" "}
            {/* Wrap the button with Link */}
            <button className="px-6 py-3 border border-purple-500 text-purple-500 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition duration-300">
              Try For Free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
