import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuizById, attemptQuiz } from '../api'; // Ensure you have appropriate API methods

const QuizAttempt = () => {
    const { id } = useParams(); // Get the quiz ID from the URL
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const getQuizDetails = async () => {
            try {
                const { data } = await fetchQuizById(id); // Fetch quiz by ID
                setQuiz(data);
                setAnswers(new Array(data.questions.length).fill(null));
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        getQuizDetails();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const { data } = await attemptQuiz(id, { answers }); // Submit the answers
            alert(`Your score: ${data.score}`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('Failed to submit quiz. Try again.');
        }
    };

    if (!quiz) return <p>Loading...</p>;

    return (
        <div>
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
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
                                    updatedAnswers[index] = optionIndex; // Store selected option
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
