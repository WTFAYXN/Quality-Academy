import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/Quiz/QuizCard";

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/quizzes/created`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("API response:", response.data); // Log the API response
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  return (
    <div>
      <h1>My Quizzes</h1>
      {quizzes.length === 0 ? (
        <p>You haven't created any quizzes yet.</p>
      ) : (
        quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz}>
            <Link to={`/quiz/${quiz._id}`}>View Quiz</Link>
          </QuizCard>
        ))
      )}
    </div>
  );
};

export default MyQuizzes;