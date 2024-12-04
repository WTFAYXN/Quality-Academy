import React from 'react';
import './PermissionPopup.css'; // Create a CSS file for styling the popup

const PermissionPopup = ({ onRequestPermission, onClose }) => {
  return (
    <div className="permission-popup">
      <div className="permission-popup-content">
        <p>You do not have permission to upload resources.</p>
        <p>Request permission to upload resources.</p>
        <button onClick={onRequestPermission}>Request Permission</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PermissionPopup;