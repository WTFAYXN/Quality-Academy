import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizForm from "../../components/Quiz/QuizForm";
import axios from "axios";

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/quizzes/${id}`)
      .then((response) => {
        setQuizData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleQuizSubmit = (data) => {
    axios
      .put(`/api/quizzes/${id}`, data)
      .then(() => {
        navigate(`/quiz/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!quizData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Quiz</h1>
      <QuizForm initialData={quizData} onSubmit={handleQuizSubmit} />
    </div>
  );
};

export default EditQuiz;
