import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AttemptQuiz = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { from: `/quizzes/${quizId}/attempt` } });
    } else {
      axios
        .get(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/attempts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.attempted) {
            navigate(`/quizzes/${quizId}/already-submitted`);
          } else {
            axios
              .get(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                setQuiz(response.data);
              })
              .catch((error) => {
                console.error("Error fetching quiz:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error checking quiz attempt:", error);
        });
    }
  }, [token, navigate, quizId]);

  const handleAnswerChange = (questionId, answer, isMultipleChoice) => {
    if (isMultipleChoice) {
      setAnswers((prevAnswers) => {
        const currentAnswers = prevAnswers[questionId] || [];
        if (currentAnswers.includes(answer)) {
          return { ...prevAnswers, [questionId]: currentAnswers.filter((a) => a !== answer) };
        } else {
          return { ...prevAnswers, [questionId]: [...currentAnswers, answer] };
        }
      });
    } else {
      setAnswers({ ...answers, [questionId]: answer });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/quizzes/${quizId}/attempt`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        navigate(`/quizzes/${quizId}/already-submitted`);
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {quiz.questions.map((q, index) => (
        <div key={q._id}>
          <p>
            {index + 1}. {q.question}
          </p>
          {q.options.map((opt) => (
            <div key={opt.optionText}>
              <label>
                <input
                  type={q.type === "multiple" ? "checkbox" : "radio"}
                  name={`question-${q._id}`}
                  value={opt.optionText}
                  onChange={() => handleAnswerChange(q._id, opt.optionText, q.type === "multiple")}
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

export default AttemptQuiz;