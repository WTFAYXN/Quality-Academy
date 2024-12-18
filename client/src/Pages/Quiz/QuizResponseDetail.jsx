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
    if (quizId && responseId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/responses/${responseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setResponse(response.data);
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
            {response.answers && response.answers.map((answer, index) => (
              <li key={index}>
                <strong>Question:</strong> {answer.question}
                <br />
                <strong>Selected Answer:</strong> {Array.isArray(answer.selectedOption) ? answer.selectedOption.join(', ') : answer.selectedOption}
                <br />
                <strong>Options:</strong>
                <ul>
                  {answer.options && answer.options.map((opt, i) => (
                    <li key={i} style={{ color: opt.isCorrect ? 'green' : 'black' }}>
                      {opt.optionText} {opt.isCorrect && "(Correct)"}
                    </li>
                  ))}
                </ul>
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