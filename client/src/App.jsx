import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Terms from './Pages/Terms/Terms';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Resources from './Pages/Resources/Resources';
import Contact from './Pages/Contact/Contact';
// import QuizAttempt from './components/QuizAttempt';
// import QuizList from './components/QuizList';
// import QuizCreator from './components/QuizCreator';
import User from './Questionnaire/User';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import AttemptQuiz from './Pages/Quiz/AttemptQuiz';
import CreateQuiz from './Pages/Quiz/CreateQuiz';
import PublicQuizzes from './Pages/Quiz/PublicQuizzes';
import AttemptedQuizzes from './Pages/Quiz/AttemptedQuizzes';
import MyQuizzes from './Pages/Quiz/MyQuizzes';
import EditQuiz from './Pages/Quiz/EditQuiz';
import QuizResponses from "./Pages/Quiz/QuizResponses";
import QuizResponseDetail from "./Pages/Quiz/QuizResponseDetail";
import AdminRequests from './Pages/Admin/AdminRequests';
import AlreadySubmittedPage from './Pages/Quiz/AlreadySubmittedPage';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import UploadQuiz from './Pages/Quiz/UploadQuiz';


function App() {


  return (
      <div className="App">
    <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />


          <Route path="/quizzes/upload" element={<UploadQuiz />} />
          <Route path="/quiz/:id" element={<EditQuiz />} />
          <Route path="/quizzes" element={<PublicQuizzes />} />
          <Route path="/quizzes/attempted" element={<AttemptedQuizzes />} />
          <Route path="/quizzes/created" element={<MyQuizzes />} />
          <Route path="/quizzes/create" element={<CreateQuiz />} />
          <Route path="/quizzes/:id" element={<AttemptQuiz />} />
          <Route path="/quizzes/:id/responses" element={<QuizResponses />} />
          <Route path="/quizzes/:id/responses/:responseId" element={<QuizResponseDetail />} />
          <Route path="/quizzes/:quizId/already-submitted" element={<AlreadySubmittedPage />} />

          

          {/* <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizAttempt />} />
          <Route path="/create-quiz" element={<QuizCreator />} /> */}
        </Routes>
    </Router>
      </div>
  );
}

export default App;