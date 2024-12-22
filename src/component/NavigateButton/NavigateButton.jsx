import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const NavigateButton = ({ path, message, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    if (onClose) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="bg-gradient-to-br from-white to-purple-100 border border-purple-300 border-none shadow-xl p-8 rounded-2xl max-w-lg mx-auto mt-20 flex flex-col items-center"
      overlayClassName="fixed inset-0 bg-purple-200/95 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        {message}
      </h2>
      <div className="flex flex-row gap-4 justify-center items-center">
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 px-6 flex-none rounded-lg font-medium text-lg hover:from-purple-600 hover:to-purple-800 transition-colors"
          onClick={() => navigate(`/${path}`)}
        >
          <span>Go to </span>
          {path}
        </button>
        <button
          className="w-full text-purple-700 py-3 px-6 rounded-lg border  hover:text-white  border-purple-400 font-medium text-lg hover:bg-purple-400 transition"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NavigateButton;
