import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Notification from "../../components/Notification/Notification";
import line from "../../assets/svgs/Line.svg";
import Remove from "../../assets/svgs/Questionnaire/Remove.svg";
import upload from '../../assets/svgs/upload.svg';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [settings, setSettings] = useState({
    isPublic: true,
    shuffleQuestions: false,
    allowMultipleAttempts: false,
  });
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("single");
  const [options, setOptions] = useState([{ optionText: "", isCorrect: false }]);
  const [points, setPoints] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const token = localStorage.getItem('token');

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      showNotification("Please login to create a questionnaire", "error");
      return;
    }
    if (questions.length === 0) {
      setError("Please add at least one question before saving the questionnare.");
      showNotification("Please add at least one question before saving the questionnare.", "error");
      return;
    }
    const data = {
      title,
      description,
      settings,
      questions,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/quizzes`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        showNotification('QQuestionnare saved successfully', 'success');
        navigate(`/user`);
      })
      .catch((error) => {
        console.error(error);
        showNotification('Error saving Questionnare', 'error');
      });
  };

  const handleAddQuestion = () => {
    if (!question.trim()) {
      setError("Question text must be provided");
      showNotification("Question text must be provided", "error");
      return;
    }
    if (type !== "short") {
      if (options.some(opt => !opt.optionText.trim())) {
        setError("All options must have text");
        showNotification("All options must have text", "error");
        return;
      }
      if (options.length <= 1) {
        setError("There must be at least two options");
        showNotification("There must be at least two options", "error");
        return;
      }
      if (!options.some(opt => opt.isCorrect)) {
        setError("At least one correct option must be selected");
        showNotification("At least one correct option must be selected", "error");
        return;
      }
      if (options.filter(opt => opt.isCorrect).length >= options.length) {
        setError("There must be at least one more option than the correct options");
        showNotification("There must be at least one more option than the correct options", "error");
        return;
      }
    }
    if (points <= 0) {
      setError("Points must be greater than 0");
      showNotification("Points must be greater than 0", "error");
      return;
    }

    const newQuestion = { question, type, options: type === "short" ? [] : options, points };
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(null);
      showNotification('Question updated successfully', 'success');
    } else {
      setQuestions([...questions, newQuestion]);
      showNotification('Question added successfully', 'success');
    }
    setQuestion("");
    setType("single");
    setOptions([{ optionText: "", isCorrect: false }]);
    setPoints(1);
    setShowQuestionForm(false);
    setError("");
  };

  const handleEditQuestion = (index) => {
    const q = questions[index];
    setQuestion(q.question);
    setType(q.type);
    setOptions(q.options);
    setPoints(q.points);
    setEditIndex(index);
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    showNotification('Question deleted successfully', 'success');
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    if (type === "single" && field === "isCorrect" && value) {
      newOptions.forEach((opt, i) => {
        if (i !== index) {
          opt.isCorrect = false;
        }
      });
    }
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { optionText: "", isCorrect: false }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <>
      <Navbar />

      <div className="quiz-create-form">
        <h1 className="quiz-setting-h1">
          Setup Your Questionnaire <span><img className="line-quiz" src={line} /></span>
        </h1>

        {/* Questionnaire  */}


        <form className="quiz-form" onSubmit={handleQuizSubmit}>

          <div className="quiz-title-description">
            <div className="title">
              <label className="title-label">Title</label>
              <input
                placeholder="Give a suitable Title"
                className="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="description">
              <label className="description-label">Description</label>
              <textarea
                placeholder="Describe it"
                className="description-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="checkboxes">
            <div className="attempts">
              <label className="attempts-label">Multiple Attempts</label>
              <input
                type="checkbox"
                checked={settings.allowMultipleAttempts}
                onChange={(e) => setSettings({ ...settings, allowMultipleAttempts: e.target.checked })}
              />
            </div>
          </div>

          <div className="added-question-main">
            {questions.map((q, index) => (
              <div className="added-question-card" key={index}>
                <div className="row">
                  <div className="col-lg-8 col-md-5 col-sm-12 text-left mb-2">
                    <div className="title-questionAdded">
                      <strong>Question:</strong> {q.question}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 col-sm-12 text-left mt-2">
                    <strong>Type:</strong> {q.type}
                    <br />
                  </div>
                </div>
                <div className="option-list">
                  <strong>Options:</strong>
                  <ol className="option-list-ol">
                    {q.options.map((opt, i) => (
                      <li key={i}>
                        {opt.optionText} {opt.isCorrect ? "(Correct)" : ""}
                      </li>
                    ))}
                  </ol>
                </div>
                <strong>Points:</strong> {q.points}
                <br />
                <div className="add-question-preview btn-edit">
                  <button type="button" onClick={() => handleEditQuestion(index)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDeleteQuestion(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showQuestionForm || questions.length === 0 ? (
            <div class="question-form-main">
              <div className="question-form">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="row">

                  <div className="col-lg-8 col-md-5 col-sm-12 text-left mb-2">
                    <input className="title-question" placeholder="Untitled Question" value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required />
                  </div>

                  <div className="col-lg-4 col-md-5 col-sm-12 text-left mt-2">

                    <select className="btn btn-secondary dropdown-toggle dropdown-questions" value={type} onChange={(e) => setType(e.target.value)}>
                      <option value="single">Single Choice</option>
                      <option value="multiple">Multiple Choice</option>
                      <option value="short">Short Answer</option>
                    </select>



                  </div>
                </div>
                {type !== "short" && (
                  <div class="row mt-2">
                    <ul>
                      {options.map((opt, index) => (
                        <li className="d-flex mt-3" key={index}>
                          <div className="d-flex test-div">
                            <span className="isAnswer">
                              <input
                                type="checkbox"
                                checked={opt.isCorrect}
                                onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)}
                              />
                            </span>
                            <input
                              type="text"
                              className="option-outline"
                              style={{ border: "0px" }}
                              value={opt.optionText}
                              placeholder={`Option ${index + 1}`}
                              onChange={(e) => handleOptionChange(index, "optionText", e.target.value)}
                            />
                            <span className="remove-option">
                              <img src={Remove} onClick={() => handleRemoveOption(index)} alt="Remove" />
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="add-option" type="button" onClick={handleAddOption}>
                      Add Option
                    </button>
                  </div>
                )}

                <hr class="separator" />

                <div className="question-functions">
                  <div className="set-marks-title d-flex">
                    <span>Marks:</span>
                    <input
                      type="number"
                      className="set-marks"
                      value={points}
                      onChange={(e) => setPoints(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div class="add-question-preview">
                <button type="button" onClick={handleAddQuestion}>
                  {editIndex !== null ? "Update Question" : "Add Question"}
                </button>
                <button type="submit" >
                  Save</button>
              </div>

            </div>
          ) : (
            <div class="add-question-preview">

              <button type="button" onClick={() => setShowQuestionForm(true)}>
                Add Question
              </button>
              <button type="submit" >Save</button>
            </div>
          )}

        </form>
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    </>
  );
};

export default CreateQuiz;