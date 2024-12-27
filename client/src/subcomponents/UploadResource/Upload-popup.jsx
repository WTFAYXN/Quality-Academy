import React, { useState, useEffect } from 'react';
import "./uploadpopup.css";
import upload from '../../assets/svgs/upload.svg';
import Notification from '../../components/Notification/Notification';

const UploadPopup = ({ file, setFile, title, setTitle, handleFileChange, handleTitleSubmit, setShowUploadPopup }) => {
  const [fileURL, setFileURL] = useState(null);
  const [category, setCategory] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

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
      setNotification({ message: 'Please enter a title and select a category.', type: 'error', visible: true });
      return;
    }
    handleTitleSubmit({ title, category });
    setNotification({ message: 'Resource uploaded successfully!', type: 'success', visible: true });
    setShowUploadPopup(false);
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Upload Resource</h2>
          <div className="upload-title-resources">
            <label className="label-form-title">Title</label>
            <input
              className="input-space"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="upload-category-resources">
            <label className="label-form-category">Category</label>
            <select
              className="input-space"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Geography">Geography</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Research">Research</option>
              <option value="Publication">Publication</option>
              <option value="ISO">ISO</option>
              <option value="COPC">COPC</option>
              <option value="Digital Transformation">Digital Transformation</option>
              <option value="Lean Six Sigma">Lean Six Sigma</option>
              <option value="Continuous Improvement">Continuous Improvement</option>
              <option value="Business Process Management">Business Process Management</option>
              <option value="Others">Others</option>

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
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
    </>
  );
};

export default UploadPopup;