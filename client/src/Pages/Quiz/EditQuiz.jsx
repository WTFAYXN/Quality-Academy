import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../../components/Quiz/QuestionForm";
import QuestionList from "../../components/Quiz/QuestionList";
import Notification from "../../components/Notification/Notification";

const EditQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  useEffect(() => {
    axios
      .get(`${url}/quizzes/${id}`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error(error);
        showNotification("Error fetching quiz", "error");
      });
  }, [id, url]);

  const handleAddQuestion = (data) => {
    if (!data.question.trim()) {
      setError("Question text must be provided");
      showNotification("Question text must be provided", "error");
      return;
    }
    if (data.options.some(opt => !opt.optionText.trim())) {
      setError("All options must have text");
      showNotification("All options must have text", "error");
      return;
    }
    if (data.options.length <= 1) {
      setError("There must be at least two options");
      showNotification("There must be at least two options", "error");
      return;
    }
    if (!data.options.some(opt => opt.isCorrect)) {
      setError("At least one correct option must be selected");
      showNotification("At least one correct option must be selected", "error");
      return;
    }
    if (data.options.filter(opt => opt.isCorrect).length >= data.options.length) {
      setError("There must be at least one more option than the correct options");
      showNotification("There must be at least one more option than the correct options", "error");
      return;
    }
    if (data.points <= 0) {
      setError("Points must be greater than 0");
      showNotification("Points must be greater than 0", "error");
      return;
    }

    axios
      .post(`${url}/quizzes/${id}/questions`, data)
      .then((response) => {
        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          questions: [...(prevQuiz.questions || []), response.data],
        }));
        setShowQuestionForm(false);
        showNotification("Question added successfully", "success");
      })
      .catch((error) => {
        console.error(error);
        showNotification("Error adding question", "error");
      });
  };

  const handleEditQuestion = (index, data) => {
    if (!data.question.trim()) {
      setError("Question text must be provided");
      showNotification("Question text must be provided", "error");
      return;
    }
    if (data.options.some(opt => !opt.optionText.trim())) {
      setError("All options must have text");
      showNotification("All options must have text", "error");
      return;
    }
    if (data.options.length <= 1) {
      setError("There must be at least two options");
      showNotification("There must be at least two options", "error");
      return;
    }
    if (!data.options.some(opt => opt.isCorrect)) {
      setError("At least one correct option must be selected");
      showNotification("At least one correct option must be selected", "error");
      return;
    }
    if (data.options.filter(opt => opt.isCorrect).length >= data.options.length) {
      setError("There must be at least one more option than the correct options");
      showNotification("There must be at least one more option than the correct options", "error");
      return;
    }
    if (data.points <= 0) {
      setError("Points must be greater than 0");
      showNotification("Points must be greater than 0", "error");
      return;
    }

    const questionId = quiz.questions[index]._id;
    axios
      .put(`${url}/quizzes/${id}/questions/${questionId}`, data)
      .then((response) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = response.data;
        setQuiz({ ...quiz, questions: updatedQuestions });
        setEditingQuestion(null);
        showNotification("Question updated successfully", "success");
      })
      .catch((error) => {
        console.error(error);
        showNotification("Error updating question", "error");
      });
  };

  const handleDeleteQuestion = (index) => {
    const questionId = quiz.questions[index]._id;
    axios
      .delete(`${url}/quizzes/${id}/questions/${questionId}`)
      .then(() => {
        const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
        setQuiz({ ...quiz, questions: updatedQuestions });
        showNotification("Question deleted successfully", "success");
      })
      .catch((error) => {
        console.error(error);
        showNotification("Error deleting question", "error");
      });
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="quiz-create-form">
      <div className="quiz-form">

        
        <h1 className="quiz-setting-h1">{quiz.title}</h1>
        <p className="quiz-setting-description">{quiz.description}</p>

        <h2 className="quiz-setting-h2">Questions</h2>
        {quiz.questions && (
          <QuestionList
            questions={quiz.questions}
            onEdit={(index) => setEditingQuestion({ index, data: quiz.questions[index] })}
            onDelete={handleDeleteQuestion}
          />
        )}

        {showQuestionForm && (
          <QuestionForm
            onSubmit={handleAddQuestion}
            onCancel={() => setShowQuestionForm(false)}
          />
        )}

        {editingQuestion && (
          <QuestionForm
            initialData={editingQuestion.data}
            onSubmit={(data) => handleEditQuestion(editingQuestion.index, data)}
            onCancel={() => setEditingQuestion(null)}
          />
        )}

        {!showQuestionForm && !editingQuestion && (
          
          <button onClick={() => setShowQuestionForm(true)}>Add Question</button>
        )}
        <div class="add-question-preview">

        <button onClick={() => navigate(`/user`)}>Publish</button>
        </div>
        
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default EditQuiz;