// import React, { useEffect, useState } from 'react';
// import { fetchQuizzes } from '../api'; // Ensure the API call attaches headers with the token

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     const fetchAllQuizzes = async () => {
//       try {
//         const { data } = await fetchQuizzes(); // API call fetches all quizzes
//         setQuizzes(data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };
//     fetchAllQuizzes();
//   }, []);

//   return (
//     <div>
//       <h1>Available Quizzes</h1>
//       {Array.isArray(quizzes) && quizzes.length > 0 ? (
//         quizzes.map((quiz) => (
//           <div key={quiz._id}>
//             <h2>{quiz.title}</h2>
//             <p>{quiz.description}</p>
//             <p>
//               Created By: <strong>{quiz.creator.name}</strong>
//             </p>
//             <a href={`/quiz/${quiz._id}`}>Attempt Quiz</a>
//           </div>
//         ))
//       ) : (
//         <p>No quizzes available</p>
//       )}
//     </div>
//   );
// };

// export default QuizList;