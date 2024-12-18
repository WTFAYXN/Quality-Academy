import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import dot from "../../assets/svgs/3dots.svg";
import { useNavigate } from "react-router-dom";
import "./QuizCard.css"; // Make sure to create and import the CSS file for styling

const QuizCard = ({ quiz, onDelete, onCopyUrl, onViewResponses }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  const handleDotClick = () => {
    setShowOptions(!showOptions);
  };

  const handleEditQuiz = () => {
    navigate(`/quiz/${quiz._id}`);
  };

  const handleDelete = () => {
    onDelete(quiz._id);
    setShowOptions(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/quizzes/${quiz._id}`);
    onCopyUrl();
    setShowOptions(false);
  };

  const handleViewResponses = () => {
    onViewResponses(quiz._id);
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="past-quiz-list">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/004/640/699/small/circle-upload-icon-button-isolated-on-white-background-vector.jpg" alt="Quiz" />
      <div className="quiz-description">
        <div className="title-date">
          <h4>{quiz.title}</h4>
          <p>{new Date(quiz.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="attempts-popup" onClick={handleDotClick}>
          <img src={dot} alt="Options" style={{ padding: "10px", border: "none", background: "none" }}/>
          {showOptions && (
            <div className="options-menu" ref={optionsRef}>
              <button onClick={handleDelete}>Delete Quiz</button>
              <button onClick={handleCopyUrl}>Copy URL</button>
              <button onClick={handleViewResponses}>See Responses</button>
              <button onClick={handleEditQuiz}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;