import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/Quiz/QuizCard";
import Notification from "../../components/Notification/Notification"; // Make sure to import the Notification component

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/quizzes/created`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const sortedQuizzes = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuizzes(sortedQuizzes);
      })
      .catch((error) => {
        console.error("Error fetching questionnares:", error);
        showNotification('Error fetching questionnares', 'error');
      });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const handleDeleteQuiz = (quizId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
        showNotification('Questionnare deleted successfully', 'success');
      })
      .catch((error) => {
        console.error("Error deleting questionnare:", error);
        showNotification('Error deleting questionnare', 'error');
      });
  };

  const handleCopyUrl = () => {
    showNotification('URL copied to clipboard', 'success');
  };

  const handleViewResponses = (quizId) => {
    navigate(`/quizzes/${quizId}/responses`);
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
      {quizzes.length === 0 ? (
        <p>You haven't created any quizzes yet.</p>
      ) : (
        quizzes.map((quiz) => (
          <QuizCard
            key={quiz._id}
            quiz={quiz}
            onDelete={handleDeleteQuiz}
            onCopyUrl={handleCopyUrl}
            onViewResponses={handleViewResponses}
          >
            <Link to={`/quiz/${quiz._id}`}>View Quiz</Link>
          </QuizCard>
        ))
      )}
    </>
  );
};

export default MyQuizzes;