import React from "react";

const LoadingComponent = () => {
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-600 to-indigo-600 backdrop-blur-lg flex items-center justify-center">
      <div className="border border-white/20 shadow-lg p-6 rounded-lg flex flex-col h-auto w-4/5 max-w-lg items-center">
        <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 h-6 w-full rounded-lg animate-pulse mb-4"></div>
        <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 h-6 w-3/4 rounded-lg animate-pulse mb-4"></div>
        <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 h-6 w-1/2 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
