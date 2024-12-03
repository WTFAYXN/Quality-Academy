import React, { useEffect, useState } from "react";
import QuizAttemptForm from "../../components/Quiz/QuizAttemptForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const AttemptQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${url}/quizzes/${id}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => console.error(error)); 
  }, [id]);

  const handleSubmit = (answers) => {
    axios.post(`${url}/quizzes/${id}/attempt`, { answers }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
      .then((response) => alert(`Score: ${response.data.score}`))
      .catch((error) => console.error(error));
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>Attempt Quiz: {quiz.title}</h1>
      <QuizAttemptForm questions={quiz.questions} onSubmit={handleSubmit} />
    </div>
  );
};

export default AttemptQuiz;
