import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import line from "../../assets/svgs/Line.svg/";
import Navbar from "../../components/Navbar/Navbar";
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
        <>
        <Navbar />
        <div className="quiz-create-form">
            <h1 className="quiz-setting-h1">
                  Attempt Questionnaire! <span><img className="line-quiz" src={line} /></span>
            </h1>
        
        <div className="response-body">
        <div className="added-question-main">

         

          <form onSubmit={handleSubmit}>
            {quiz.questions.map((q, index) => (
              <div key={q._id}>
                <div className="question-form">

                <p className="attempt-question-title">
                  {index + 1}. {q.question}
                </p>
                {q.options.map((opt) => (
                  <div className="d-flex gap-3 my-3 option-attempt" key={opt.optionText}>
                      <input
                        type={q.type === "multiple" ? "checkbox" : "radio"}
                        name={`question-${q._id}`}
                        value={opt.optionText}
                        onChange={() => handleAnswerChange(q._id, opt.optionText, q.type === "multiple")}
                      />

                      <p>{opt.optionText}</p>
                    
                  </div>
                ))}
                </div>
                <div className="submit-clear-btn">
                <button className="submit-attempt-btn" type="submit">Submit Answers</button>
                <button className="clear-attempt-btn">Clear Questionnarie</button>
                </div>
              </div>
            ))}
          </form>
          </div>
        </div>


        <div className="report-questionnaire">

        <p>This content is neither created nor endorsed by Quality Academy. - <Link to="/terms">Terms of Service</Link>  - <Link to="/terms">Privacy Policy</Link></p>
        <p>Does this form look suspicious? Report</p>
  

        </div>
  </div>
        </>
  );
};

export default AttemptQuiz;