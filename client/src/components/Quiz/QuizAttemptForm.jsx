import React, { useState } from "react";

const QuizAttemptForm = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    // console.log(`Question ID: ${questionId}, Selected Answer: ${answer}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <div key={q._id}>
          <p>
            {index + 1}. {q.question}
          </p>
          {q.options.map((opt) => (
            <div key={opt.optionText}>
              <label>
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  value={opt.optionText}
                  onChange={() => handleAnswerChange(q._id, opt.optionText)}
                />
                {opt.optionText}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit Answers</button>
    </form>
  );
};

export default QuizAttemptForm;