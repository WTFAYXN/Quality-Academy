import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/Notification/Notification";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import line from "../../assets/svgs/Line.svg";

const QuizResponses = () => {
  const { id: quizId } = useParams();
  const [responses, setResponses] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/responses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setResponses(response.data);
        if (response.data.length > 0) {
          setTotalMarks(response.data[0].quiz.totalPoints); // Assuming all responses have the same total points
        }
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
      <div className="container table-responsive py-5">
        <div className="heading-resources">
          <h1 className="heading-resources-text">Quiz Responses</h1>
          <img className='resources-line' src={line} alt="Line" />
        </div>
        {responses.length === 0 ? (
          <p>No responses yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Attempted Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => (
                  <tr key={response._id}>
                    <td>{response.user.name}</td>
                    <td>{response.user.email}</td>
                    <td>{new Date(response.completedAt).toLocaleDateString()}</td>
                    <td>{new Date(response.completedAt).toLocaleTimeString()}</td>
                    <td>{response.score}</td>
                    <td>
                      <Link to={`/quizzes/${quizId}/responses/${response._id}`}>See Response</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default QuizResponses;