import React, { useState, useEffect } from 'react';
import "./uploadpopup.css";
import upload from '../../assets/svgs/upload.svg';

const UploadPopup = ({ file, setFile, title, setTitle, handleFileChange, handleTitleSubmit, setShowUploadPopup }) => {
  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const renderFilePreview = () => {
    if (!fileURL) return null;

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return <img src={fileURL} alt="File Preview" className="file-preview" />;
    } else if (['pdf'].includes(fileExtension)) {
      return <embed src={fileURL} type="application/pdf" className="file-preview" />;
    } else {
      return <p className="file-preview">{file.name}</p>;
    }
  };

  const handleCancel = () => {
    setFile(null);
    setShowUploadPopup(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Upload Resource</h2>
        <div className="upload-title-resources">
          <label className="label-form">Title</label>
          <input
            className="input-space"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="upload-file-resources">
          {file ? (
            renderFilePreview()
          ) : (
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={upload} alt="Upload" />
              <p>Drop your file or click to upload</p>
            </label>
          )}
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="cancel-submit-btn">
          <button className="cancel-upload" onClick={handleCancel}>Cancel</button>
          <button className="submit-upload" onClick={handleTitleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default UploadPopup;