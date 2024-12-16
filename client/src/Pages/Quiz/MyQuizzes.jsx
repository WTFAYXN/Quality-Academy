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
        // console.log("API response:", response.data); // Log the API response
        setQuizzes(response.data);
        // console.log("Quizzes:", response.data); // Log the quizzes state
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        showNotification('Error fetching quizzes', 'error');
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
        showNotification('Quiz deleted successfully', 'success');
      })
      .catch((error) => {
        console.error("Error deleting quiz:", error);
        showNotification('Error deleting quiz', 'error');
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