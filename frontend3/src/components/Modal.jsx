import React from "react";

const XMarkIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 bg-black/50 
        flex items-start justify-center 
        p-4 overflow-y-auto
      "
      onClick={onClose}
    >
      {/* Wrapper agar modal tidak nabrak saat keyboard muncul */}
      <div className="w-full mt-10 max-w-lg">
        <div
          className="
            bg-white rounded-xl shadow-2xl 
            w-full transform transition-all duration-300 ease-out
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {title || "Formulir"}
            </h3>

            <button
              onClick={onClose}
              className="
                text-gray-500 hover:text-gray-800 
                p-2 rounded-full 
                hover:bg-gray-100 
                transition
              "
            >
              <XMarkIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Isi modal scrollable */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
