import React from "react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mc-card w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-white"
        >
          x
        </button>
        <h2 className="text-xl font-bold text-white mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}
