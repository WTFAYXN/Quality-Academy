import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Automatically close after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [visible, onClose]);

  if (!visible) return null; // Don't render if not visible

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
