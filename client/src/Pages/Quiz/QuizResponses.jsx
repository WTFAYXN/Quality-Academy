import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/Notification/Notification";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const QuizResponses = () => {
  const { id: quizId } = useParams();
  const [responses, setResponses] = useState([]);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });

  useEffect(() => {
    // console.log("quizId:", quizId);
    axios
      .get(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/responses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching responses:", error);
        showNotification('Error fetching responses', 'error');
      });
  }, [quizId]);

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <>
    <Navbar />

      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
      <div className="quiz-responses">
      <h1>Quiz Responses</h1>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Attempted Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response._id}>
                <td>{response.user.name}</td>
                <td>{response.user.email}</td>
                <td>{new Date(response.completedAt).toLocaleDateString()}</td>
                <td>{new Date(response.completedAt).toLocaleTimeString()}</td>
                <td>
                  <Link to={`/quizzes/${quizId}/responses/${response._id}`}>See Response</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <Footer />
    </>
  );
};

export default QuizResponses;