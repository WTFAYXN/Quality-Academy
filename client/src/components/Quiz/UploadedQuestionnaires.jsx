import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./UploadedQuestionnaires.css";
import Placeholder from "../../assets/images/QuestionnairePlaceholder.png";
import dot from "../../assets/svgs/3dots.svg";
import Notification from "../Notification/Notification";

const UploadedQuestionnaires = () => {
  const [uploadedQuizzes, setUploadedQuizzes] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });
  const optionsRef = useRef(null);

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
      await axios.delete(`${import.meta.env.VITE_API_URL}/quizzes/uploaded/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadedQuizzes(uploadedQuizzes.filter((quiz) => quiz._id !== quizId));
      setNotification({ message: "Quiz deleted successfully!", type: "success", visible: true });
    } catch (error) {
      console.error("Error deleting quiz:", error);
      setNotification({ message: "Failed to delete quiz.", type: "error", visible: true });
    }
  };

  const handleCopyUrl = (quizUrl) => {
    navigator.clipboard.writeText(quizUrl);
    setNotification({ message: "Quiz URL copied to clipboard!", type: "success", visible: true });
  }

  const toggleMenu = (quizId) => {
    setActiveMenu(activeMenu === quizId ? null : quizId);
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  return (
  <>
      {uploadedQuizzes.length === 0 ? (
        <p>No uploaded questionnaires found.</p>
      ) : (
        <div className="past-questionnaire-lists">
          {uploadedQuizzes.map((quiz) => (
            <div key={quiz._id} className="past-quiz-list">
              <img src={Placeholder} alt="Quiz" />
              <div className="quiz-description">
                <div className="title-date">
                  <h4>{decodeURIComponent(quiz.title)}</h4>
                  <p>{quiz.description}</p>
                  <p>{new Date(quiz.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="attempts-popup" onClick={() => toggleMenu(quiz._id)}>
                  <img src={dot} alt="Menu" style={{ padding: "10px", border: "none", background: "none" }} />
                  {activeMenu === quiz._id && (
                    <div className="options-menu" ref={optionsRef}>
                      <button onClick={() => window.open(quiz.imageUrl, '_blank')}>Download</button>
                      <button onClick={() => handleCopyUrl(quiz.imageUrl)}>Copy URL</button>
                      <button onClick={() => handleDelete(quiz._id)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
    </>
  );
};

export default UploadedQuestionnaires;