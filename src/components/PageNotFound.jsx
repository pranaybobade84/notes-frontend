import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-lg text-gray-500 mt-2 mb-8">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/home"
          className=" px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
