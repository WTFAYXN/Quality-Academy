import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <div className="quiz-card">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <p>
        Created By: <strong>{quiz.creator.name}</strong>
      </p>
      <Link to={`/quizzes/${quiz._id}/attempt`}>Attempt Quiz</Link>
    </div>
  );
};

export default QuizCard;