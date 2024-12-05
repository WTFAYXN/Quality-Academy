import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../../components/Quiz/QuestionForm";
import QuestionList from "../../components/Quiz/QuestionList";

const QuizDetails = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const url = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${url}/quizzes/${id}`)
            .then((response) => {
                // console.log("Quiz data:", response.data); // Log the quiz data
                setQuiz(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id, url]);

    const handleAddQuestion = (data) => {
        axios
            .post(`${url}/quizzes/${id}/questions`, data)
            .then((response) => {
                setQuiz((prevQuiz) => ({
                    ...prevQuiz,
                    questions: [...(prevQuiz.questions || []), response.data],
                }));
                setShowQuestionForm(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleEditQuestion = (index, data) => {
        const questionId = quiz.questions[index]._id;
        axios
            .put(`${url}/quizzes/${id}/questions/${questionId}`, data)
            .then((response) => {
                const updatedQuestions = [...quiz.questions];
                updatedQuestions[index] = response.data;
                setQuiz({ ...quiz, questions: updatedQuestions });
                setEditingQuestion(null);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteQuestion = (index) => {
        const questionId = quiz.questions[index]._id;
        axios
            .delete(`${url}/quizzes/${id}/questions/${questionId}`)
            .then(() => {
                const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
                setQuiz({ ...quiz, questions: updatedQuestions });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlePublishQuiz = () => {
        axios
            .put(`${url}/quizzes/${id}`, { status: "published" },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
              })
            .then((response) => {
                alert("Quiz published successfully!");
                setQuiz(response.data); // Update the local state with the updated quiz
                navigate(`/quizzes/created`); // Redirect to the quiz details page
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to publish the quiz.");
            });
    };

    if (!quiz) return <p>Loading...</p>;

    // console.log("Quiz status:", quiz.status); // Log the quiz status

    return (
        <div className="quiz-create-form ">
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

                {quiz.status === "draft" && (
                    <button onClick={handlePublishQuiz}>Publish Quiz</button>
                )}
            </div>
        </div>
    );
};

export default QuizDetails;