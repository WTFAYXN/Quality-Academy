import React from "react";

const QuestionList = ({ questions, onEdit, onDelete }) => {
    if (!questions || questions.length === 0) {
        return <p>No questions available.</p>;
      }
      
  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <p>Points: {question.points}</p>
          <ul>
            {question.options.map((option, idx) => (
              <li key={idx}>
                {option.optionText} {option.isCorrect && "(Correct)"}
              </li>
            ))}
          </ul>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
