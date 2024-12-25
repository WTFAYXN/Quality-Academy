import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadedQuestionnaires.css";

const UploadedQuestionnaires = () => {
  const [uploadedQuizzes, setUploadedQuizzes] = useState([]);

  useEffect(() => {
    const fetchUploadedQuizzes = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/uploaded`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUploadedQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching uploaded quizzes:", error);
      }
    };

    fetchUploadedQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadedQuizzes(uploadedQuizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleCopyUrl = (quizUrl) => {
    navigator.clipboard.writeText(quizUrl);
    alert("Quiz URL copied to clipboard!");
  }
  // const handleDownload = async (quizId, quizTitle) => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/download/${quizId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       responseType: 'blob', // Important to handle binary data
  //     });

  //     // Create a URL for the blob and trigger a download
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', quizTitle); // Set the file name
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading quiz:", error);
  //   }
  // };

  return (
    <div className="uploaded-quizzes">
      {uploadedQuizzes.length === 0 ? (
        <p>No uploaded questionnaires found.</p>
      ) : (
        <div className="quiz-card-container">
          {uploadedQuizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <div className="quiz-card-actions">
                <button onClick={() => window.open(quiz.imageUrl, '_blank')}>
                  Download
                </button>
                <button onClick={() => handleCopyUrl(quiz.imageUrl)}>
                  Copy URL
                </button>
                <button onClick={() => handleDelete(quiz._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedQuestionnaires;