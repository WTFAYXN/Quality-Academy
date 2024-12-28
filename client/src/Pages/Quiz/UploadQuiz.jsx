import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Notification from "../../components/Notification/Notification";
import line from "../../assets/svgs/Line.svg";
import upload from "../../assets/svgs/upload.svg";

const UploadQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const token = localStorage.getItem('token');

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", encodeURIComponent(title)); // Encode the title
    formData.append("description", description);
    formData.append("file", file);

    axios.post(`${import.meta.env.VITE_API_URL}/quizzes/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      showNotification('Quiz uploaded successfully', 'success');
      navigate(`/user`);
    })
    .catch((error) => {
      console.error(error);
      showNotification('Error uploading quiz', 'error');
    });
  };

  const filePreview = useMemo(() => {
    if (!file) return null;

    const fileURL = URL.createObjectURL(file);
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return <img src={fileURL} alt="File Preview" className="file-preview" />;
    } else if (['pdf'].includes(fileExtension)) {
      return <embed src={fileURL} type="application/pdf" className="file-preview" />;
    } else {
      return <p className="file-preview">{file.name}</p>;
    }
  }, [file]);

  return (
    <>
      <Navbar />
      <div className="quiz-create-form">
        <h1 className="quiz-setting-h1">
          Upload Your Questionnaire <span><img className="line-quiz" src={line} /></span>
        </h1>
        <form className="quiz-form" onSubmit={handleTitleSubmit}>
          <div className="quiz-title-description">
            <div className="title">
              <label className="title-label">Title</label>
              <input
                placeholder="Give a suitable Title for Quiz"
                className="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="description">
              <label className="description-label">Description</label>
              <textarea
                placeholder="Describe Your Quiz"
                className="description-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="upload-file-section">
            {!file ? (
              <label htmlFor="file-upload" className="custom-file-upload">
                <img src={upload} alt="Upload" />
                <p>Drop your file or click to upload</p>
              </label>
            ) : (
              <p className="file-name"></p>
            )}
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {filePreview}
          </div>
          <div className="submit-clear-btn">
            <button className="submit-attempt-btn" type="submit">Upload Quiz</button>
            <button className="clear-attempt-btn" type="button" onClick={() => setFile(null)}>Clear</button>
          </div>
        </form>
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    </>
  );
};

export default UploadQuiz;