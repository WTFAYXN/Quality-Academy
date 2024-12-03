import React, { useEffect, useState } from "react";
import QuizList from "../../components/Quiz/QuizList";
import axios from "axios";

const PublicQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${url}/quizzes`)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Public Quizzes</h1>
      <QuizList quizzes={quizzes} />
    </div>
  );
};

export default PublicQuizzes;
