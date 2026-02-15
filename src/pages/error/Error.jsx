import React from 'react';
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error("Route Error:", error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-950 px-4 text-center">
      <h1 className="text-6xl font-semibold text-[#F97316]">Oops!</h1>
      <p className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
        {error?.status === 404 ? "Page Not Found" : "Something went wrong"}
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400 italic">
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-3 bg-[#F97316] text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-[#EA580C] transition-all"
      >
        Go back home
      </Link>
    </div>
  );
};

export default Error;

