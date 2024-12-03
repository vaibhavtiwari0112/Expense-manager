import React from "react";
import { useNavigate } from "react-router-dom";

const NavigateButton = ({ path }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 flex min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600  backdrop-blur-lg border border-white/20 shadow-lg p-6 rounded-lg flex-col items-center">
      <button
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-indigo-600 transition-colors"
        onClick={() => navigate(`/${path}`)}
      >
        Go to <span>{path}</span>
      </button>
    </div>
  );
};

export default NavigateButton;
