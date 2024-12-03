import React from "react";
import QuizCard from "./QuizCard";

const QuizList = ({ quizzes = [] }) => {
  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    return <p>No quizzes found!</p>;
  }

  return (
    <div className="quiz-list">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
};

export default QuizList;