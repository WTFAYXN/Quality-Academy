import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizForm from "../../components/Quiz/QuizForm";
import axios from "axios";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const url = import.meta.env.VITE_APP_URL;
  const token = localStorage.getItem('token');

  const handleQuizSubmit = (data) => {
    axios
      .post(`http://localhost:5000/quizzes`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setQuizData(response.data);
        navigate(`/quiz/${response.data._id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Create a New Quiz</h1>
      <QuizForm onSubmit={handleQuizSubmit} />
    </div>
  );
};

export default CreateQuiz;
