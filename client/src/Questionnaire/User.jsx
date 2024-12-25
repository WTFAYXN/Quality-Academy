import React, { useState, useEffect } from "react";
import Nav from "../components/Navbar/Navbar";
import "./User.css";
import Upload from "../assets/svgs/Questionnaire/upload.svg";
import Add from "../assets/svgs/Questionnaire/add.svg";
import { Link } from "react-router-dom";
import MyQuizzes from "../Pages/Quiz/MyQuizzes";
import UploadedQuestionnaires from "../components/Quiz/UploadedQuestionnaires";
import axios from "axios";

const User = () => {
  const [showCreated, setShowCreated] = useState(true);
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setName(response.data.name);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }

    const currentHour = new Date().getHours();
    if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 18 || currentHour < 6) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Morning");
    }
  }, []);

  return (
    <>
      <Nav />

      {/* Create Quiz */}
      <div className="create-quiz">
        <h1 className="user-greet">
          {greeting}, {name}
          <span className="ask-user">What do you want to do today?</span>
        </h1>

        <div className="create-upload">
          <Link className="quiz-create-link" to="/quizzes/create">
            <div className="quiz-create">
              <div className="create-quiz-btn">
                <img src={Add} />
              </div>
              <p>Create a questionnaire</p>
            </div>
          </Link>

          <div className="quiz-create">
            <Link className="quiz-create-link" to="/resources">
              <div className="upload-resources-btn">
                <img src={Upload} />
              </div>
              <p>Upload Resources</p>
            </Link>
          </div>

          <div className="quiz-create">
            <Link className="quiz-create-link" to="/quizzes/upload">
              <div className="upload-resources-btn">
                <img src={Upload} />
              </div>
              <p>Upload Questionnaire</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${showCreated ? "active" : ""}`}
          onClick={() => setShowCreated(true)}
        >
          Created Questionnaires
        </button>
        <button
          className={`toggle-button ${!showCreated ? "active" : ""}`}
          onClick={() => setShowCreated(false)}
        >
          Uploaded Questionnaires
        </button>
      </div>

      {/* Display Section */}
      <div className="past-quiz-lists">
        {showCreated ? <MyQuizzes /> : <UploadedQuestionnaires />}
      </div>
    </>
  );
};

export default User;