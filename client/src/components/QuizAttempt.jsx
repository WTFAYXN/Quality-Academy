import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuizzes, attemptQuiz } from '../api';

const QuizAttempt = () => {
    const { id } = useParams(); // Get the quiz ID from the URL
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        fetchQuizzes()
            .then(({ data }) => {
                const quiz = data.find((q) => q._id === id);
                setQuiz(quiz);
                setAnswers(new Array(quiz.questions.length).fill(null));
            })
            .catch(console.error);
    }, [id]);

    const handleSubmit = async () => {
        const { data } = await attemptQuiz(id, answers);
        alert(`Your score: ${data.score}`);
    };

    if (!quiz) return <p>Loading...</p>;

    return (
        <div>
            <h1>{quiz.title}</h1>
            {quiz.questions.map((q, index) => (
                <div key={index}>
                    <p>{q.question}</p>
                    {q.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                onChange={() => {
                                    const updatedAnswers = [...answers];
                                    updatedAnswers[index] = optionIndex;
                                    setAnswers(updatedAnswers);
                                }}
                            />
                            {option}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
};

export default QuizAttempt;
