
import React, { useState } from 'react';
import "./uploadpopup.css";
import upload from '../../assets/svgs/upload.svg';
function UploadPopup() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleTitleSubmit = () => {
    console.log('Title submitted:', title);
    setIsPopupVisible(false); // Close the popup after submission
  };

  return (
    <div>
      <button onClick={() => setIsPopupVisible(true)}>Open Popup</button>

      {isPopupVisible && (
        <div class="popup-overlay">
        <div class="popup-content">
          <div class="upload-title-resources">
            <label class="label-form">Title</label>
            <input class="input-space"/>
          </div>
          <div class="upload-file-resources">
            <img src={upload}/>
            
            <p>Drop your file </p>
            
          </div>
          
          <div class="cancel-submit-btn">
            <button class="cancel-upload">Cancel</button>
            <button class="submit-upload">Submit</button>
          </div>
        </div>
      </div>
      )}

    </div>
  );
}

export default UploadPopup;
