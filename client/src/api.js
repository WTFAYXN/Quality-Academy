import axios from 'axios';

// Base URL of your backend server
const API = axios.create({ baseURL: 'http://localhost:5000' });

// API functions
export const fetchQuizzes = () => API.get('/quizzes'); // Fetch all quizzes
export const createQuiz = (quizData) => API.post('/quizzes', quizData); // Create a quiz
export const attemptQuiz = (id, answers) => API.post(`/quizzes/${id}/attempt`, { answers }); // Attempt a quiz
