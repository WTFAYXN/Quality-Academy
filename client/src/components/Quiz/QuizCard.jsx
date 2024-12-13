import React from "react";
import { Link } from "react-router-dom";
import dot from "../../assets/svgs/3dots.svg";
const QuizCard = ({ quiz }) => {
  return (
    // <div className="quiz-card">
    //   <h2>{quiz.title}</h2>
    //   <p>{quiz.description}</p>
    //   <p>
    //     Created By: <strong>{quiz.creator.name}</strong>
    //   </p>
    //   <Link to={`/quizzes/${quiz._id}/attempt`}>Attempt Quiz</Link>
    // </div>

   
  <div class="past-quiz-list">
    <img src="https://static.vecteezy.com/system/resources/thumbnails/004/640/699/small/circle-upload-icon-button-isolated-on-white-background-vector.jpg"/>
    
    <div class="quiz-description">
      
      <div class="title-date">
      <h4>{quiz.title}</h4>
      <p>{quiz.description}</p>
      </div>
      
      <div class="attempts-popup">
        <img src={dot} />
      </div>
    </div>
  </div>

  );
};

export default QuizCard;