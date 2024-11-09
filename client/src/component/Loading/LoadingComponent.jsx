// LoadingComponent.jsx
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 rounded-lg flex flex-col space-y-4 items-center">
      <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 h-6 w-full rounded-lg animate-pulse"></div>
      <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 h-6 w-3/4 rounded-lg animate-pulse"></div>
      <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 h-6 w-1/2 rounded-lg animate-pulse"></div>
    </div>
  );
};

export default LoadingComponent;
