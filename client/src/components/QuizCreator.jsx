import React, { useState } from 'react';
import { createQuiz } from '../api';

const QuizCreator = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    // Add a new question
    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    // Handle quiz submission
    const handleSubmit = async () => {
        const quizData = { title, description, questions };
        await createQuiz(quizData);
        alert('Quiz created successfully!');
    };

    return (
        <div>
            <h1>Create Quiz</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addQuestion}>Add Question</button>
            {questions.map((q, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Question"
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].question = e.target.value;
                            setQuestions(updatedQuestions);
                        }}
                    />
                    {q.options.map((option, optionIndex) => (
                        <input
                            key={optionIndex}
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].options[optionIndex] = e.target.value;
                                setQuestions(updatedQuestions);
                            }}
                        />
                    ))}
                    <select
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].correctAnswer = Number(e.target.value);
                            setQuestions(updatedQuestions);
                        }}
                    >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                    </select>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
};

export default QuizCreator;
