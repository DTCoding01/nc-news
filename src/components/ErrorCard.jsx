import React from "react";
import '../css/components/ErrorCard.scss'

export default function ErrorCard({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-card-overlay">
      <div className="error-card">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}
