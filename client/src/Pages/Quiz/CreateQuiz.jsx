import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Notification from "../../components/Notification/Notification";
import line from "../../assets/svgs/Line.svg";

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
    if (questions.length === 0) {
      setError("Please add at least one question before saving the quiz.");
      showNotification("Please add at least one question before saving the quiz.", "error");
      return;
    }
    const data = {
      title,
      description,
      settings,
      questions,
    };
    axios
      .post(`http://localhost:5000/quizzes`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        showNotification('Quiz saved successfully', 'success');
        navigate(`/quiz/${response.data._id}`);
      })
      .catch((error) => {
        console.error(error);
        showNotification('Error saving quiz', 'error');
      });
  };

  const handleAddQuestion = () => {
    if (!question.trim()) {
      setError("Question text must be provided");
      showNotification("Question text must be provided", "error");
      return;
    }
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
    if (points <= 0) {
      setError("Points must be greater than 0");
      showNotification("Points must be greater than 0", "error");
      return;
    }

    const newQuestion = { question, type, options, points };
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
        <form className="quiz-form" onSubmit={handleQuizSubmit}>
          <div className="title">
            <label className="title-label">Title</label>
            <input
              placeholder="Give a suitable Title for Questionnaire"
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
              placeholder="Describe Your Questionnaire"
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          {/* <div className="checkboxes">
            <div className="isPublic">
              <label className="isPublic-label">Public</label>
              <input
                type="checkbox"
                checked={settings.isPublic}
                onChange={(e) => setSettings({ ...settings, isPublic: e.target.checked })}
              />
            </div>
            <div className="shuffle">
              <label className="shuffle-label">Shuffle Questions</label>
              <input
                type="checkbox"
                checked={settings.shuffleQuestions}
                onChange={(e) => setSettings({ ...settings, shuffleQuestions: e.target.checked })}
              />
            </div>
            <div className="attempts">
              <label className="attempts-label">Multiple Attempts</label>
              <input
                type="checkbox"
                checked={settings.allowMultipleAttempts}
                onChange={(e) => setSettings({ ...settings, allowMultipleAttempts: e.target.checked })}
              />
            </div>
          </div> */}
          {showQuestionForm || questions.length === 0 ? (
            <div className="question-form">
              <h2>{editIndex !== null ? "Edit Question" : "Add Questions"}</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div>
                <label>Question</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>
              <div>
                <label>Options</label>
                {options.map((opt, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={opt.optionText}
                      onChange={(e) => handleOptionChange(index, "optionText", e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={opt.isCorrect}
                        onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)}
                      />
                      Correct
                    </label>
                    <button type="button" onClick={() => handleRemoveOption(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddOption}>
                  Add Option
                </button>
              </div>
              <div>
                <label>Points</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                />
              </div>
              <button type="button" onClick={handleAddQuestion}>
                {editIndex !== null ? "Update Question" : "Add Question"}
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setShowQuestionForm(true)}>
              Add Another Question
            </button>
          )}
          <div className="added-questions">
            <h2>Added Questions</h2>
            <ul>
              {questions.map((q, index) => (
                <li key={index}>
                  <strong>Question:</strong> {q.question}
                  <br />
                  <strong>Type:</strong> {q.type}
                  <br />
                  <strong>Options:</strong>
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>
                        {opt.optionText} {opt.isCorrect ? "(Correct)" : ""}
                      </li>
                    ))}
                  </ul>
                  <strong>Points:</strong> {q.points}
                  <br />
                  <button type="button" onClick={() => handleEditQuestion(index)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDeleteQuestion(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn-quiz-setting" type="submit">
            Save Quiz
          </button>
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