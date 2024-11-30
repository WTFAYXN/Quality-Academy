import React, { useEffect, useState } from 'react';
import { fetchQuizzes } from '../api';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    // Fetch quizzes from the backend when the component loads
    useEffect(() => {
        fetchQuizzes().then(({ data }) => setQuizzes(data)).catch(console.error);
    }, []);

    return (
        <div>
            <h1>Available Quizzes</h1>
            {quizzes.map((quiz) => (
                <div key={quiz._id}>
                    <h2>{quiz.title}</h2>
                    <p>{quiz.description}</p>
                    <a href={`/quiz/${quiz._id}`}>Attempt Quiz</a>
                </div>
            ))}
        </div>
    );
};

export default QuizList;
