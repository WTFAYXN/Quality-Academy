import React, { useState, useEffect } from "react";
import axios from "axios";

const AttemptedQuizzes = () => {
  const [attempts, setAttempts] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${url}/quizzes/attempted`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("API response:", response.data); // Log the API response
        setAttempts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attempted quizzes:", error);
      });
  }, [url]);

  return (
    <div>
      <h1>Quizzes You Attempted</h1>
      {Array.isArray(attempts) && attempts.length === 0 ? (
        <p>You haven't attempted any quizzes yet.</p>
      ) : (
        <ul>
          {Array.isArray(attempts) && attempts.map((attempt) => (
            <li key={attempt._id}>
              <h3>{attempt.quiz.title}</h3>
              <p>Score: {attempt.score}/{attempt.quiz.questions.length}</p>
              <p>Completed on: {new Date(attempt.completedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttemptedQuizzes;