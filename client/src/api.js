// import axios from 'axios';

// const API = axios.create({
//     baseURL: import.meta.env.VITE_API_URL, // Replace with your API URL
// });

// // Add auth token to every request
// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem('token'); // Fetch token from localStorage
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });

// // Fetch all quizzes
// export const fetchQuizzes = () => API.get('/quizzes');

// // Fetch quiz by ID
// export const fetchQuizById = (id) => API.get(`/quizzes/${id}`);

// // Create a new quiz
// export const createQuiz = (quizData) => API.post('/quizzes', quizData);

// // Submit quiz answers
// export const attemptQuiz = (id, answers) => API.post(`/quizzes/${id}/attempt`, answers);


import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

// Fetch all public quizzes
export const fetchPublicQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quizzes`);
  return response.data;
};

// Fetch quiz by ID
export const fetchQuizById = async (id) => {
  const response = await axios.get(`${API_URL}/quizzes/${id}`);
  return response.data;
};

// Create a new quiz
export const createQuiz = async (quizData) => {
  const response = await axios.post(`${API_URL}/quizzes`, quizData);
  return response.data;
};

// Update a quiz
export const updateQuiz = async (id, quizData) => {
  const response = await axios.put(`${API_URL}/quizzes/${id}`, quizData);
  return response.data;
};

// Delete a quiz
export const deleteQuiz = async (id) => {
  const response = await axios.delete(`${API_URL}/quizzes/${id}`);
  return response.data;
};
