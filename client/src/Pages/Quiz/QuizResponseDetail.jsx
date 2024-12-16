import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/Notification/Notification";

const QuizResponseDetail = () => {
  const { id: quizId, responseId } = useParams(); // Ensure this matches the route parameter
  const [response, setResponse] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });

  useEffect(() => {
   // console.log("Fetching response for quizId:", quizId, "responseId:", responseId); // Add this line for debugging
    if (quizId && responseId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/responses/${responseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setResponse(response.data);
          //console.log("Response:", response.data); // Log the response data
        })
        .catch((error) => {
          console.error("Error fetching response:", error);
          showNotification('Error fetching response', 'error');
        });
    } else {
      console.error("quizId or responseId is undefined");
    }
  }, [quizId, responseId]);

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
      <h1>Quiz Response Detail</h1>
      {response ? (
        <div>
          <h2>{response.user.name}</h2>
          <p>Email: {response.user.email}</p>
          <p>Completed At: {new Date(response.completedAt).toLocaleString()}</p>
          <h3>Answers:</h3>
          <ul>
            {response.answers.map((answer, index) => (
              <li key={index}>
                <strong>Question:</strong> {answer.question}
                <br />
                <strong>Answer:</strong> {answer.selectedOption.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading response...</p>
      )}
    </>
  );
};

export default QuizResponseDetail;