import React, { useState, useEffect } from 'react';
import "./uploadpopup.css";
import upload from '../../assets/svgs/upload.svg';

const UploadPopup = ({ file, setFile, title, setTitle, handleFileChange, handleTitleSubmit, setShowUploadPopup }) => {
  const [fileURL, setFileURL] = useState(null);
  const [category, setCategory] = useState('');

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

  const handleSubmit = () => {
    if (!title || !category) {
      alert('Please enter a title and select a category.');
      return;
    }
    handleTitleSubmit({ title, category });
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
        <div className="upload-category-resources">
          <label className="label-form">Category</label>
          <select
            className="input-space"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Math">Math</option>
            <option value="Law">Law</option>
          </select>
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
          <button className="submit-upload" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default UploadPopup;