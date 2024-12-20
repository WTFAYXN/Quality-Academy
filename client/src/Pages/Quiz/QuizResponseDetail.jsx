import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/Notification/Notification";
import Navbar from "../../components/Navbar/Navbar";
import line from "../../assets/svgs/Line.svg";
const QuizResponseDetail = () => {
  const { id: quizId, responseId } = useParams(); // Ensure this matches the route parameter
  const [response, setResponse] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });

  useEffect(() => {
    if (quizId && responseId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/responses/${responseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setResponse(response.data);
        })
        .catch((error) => {
          console.error("Error fetching response:", error);
          showNotification('Error fetching response', 'error');
        });
    } else {
      console.error("quizId or responseId is undefined");
    }
  }, [quizId, responseId]);

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <>
    <Navbar />
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    <div className="quiz-create-form">
                <h1 className="quiz-setting-h1">
                      Check Response <span><img className="line-quiz" src={line} /></span>
                </h1>
            </div>
      {response ? (
         <div className="quiz-create-form">

            <div className="response-detail">
              <div className="responser-info">
                <h2>
                  <span className="span-responser-info">Name</span>
                  {response.user.name}
                </h2>
                <p>
                  <span className="span-responser-info">Email:</span>
                  {response.user.email}
                </p>
                <p>
                  <span className="span-responser-info">Completed At:</span>
                  {new Date(response.completedAt).toLocaleString()}
                </p>

                </div>

             <div className="row text-center">
             <h3 className="fw-bold">Response:</h3>
              </div>
              <ol className="response-ol">
                {response.answers && response.answers.map((answer, index) => (
                  <li  key={index}>
                    <div className="question-form">
                      <div className="question-infoResponse">
                        <div className="infoResponse-question">
                          <strong>Question:</strong> {answer.question}
                        </div>

                        <div className="infoResponse-answer">
                          <strong>Selected Answer:</strong> {Array.isArray(answer.selectedOption) ? answer.selectedOption.join(', ') : answer.selectedOption}
                        </div>

                        <div className="infoResponse-options">
                        <strong>Options:</strong>
                            <ul>
                              {answer.options && answer.options.map((opt, i) => (
                                <li key={i} style={{ color: opt.isCorrect ? 'green' : 'black' }}>
                                  {opt.optionText} {opt.isCorrect && "(Correct)"}
                                </li>
                              ))}
                            </ul>
                        </div>
                        
                      </div>
                    
                      
                      </div>
                  </li>
                ))}
              </ol>
            </div>

         </div>
      ) : (
        <p>Loading response...</p>
      )}

            <div className="report-questionnaire">
     
             <p>This content is neither created nor endorsed by Quality Academy. - <Link to="/terms">Terms of Service</Link>  - <Link to="/terms">Privacy Policy</Link></p>
             <p>Does this form look suspicious? Report</p>
       
     
             </div>
    </>
  );
};

export default QuizResponseDetail;