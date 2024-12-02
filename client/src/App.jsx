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
import QuizAttempt from './components/QuizAttempt';
import QuizList from './components/QuizList';
import QuizCreator from './components/QuizCreator';
import User from './Questionnaire/User';


function App() {


  return (
      <div className="App">
    <Router>
        <Routes>
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/user" element={<User />} />

          <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizAttempt />} />
          <Route path="/create-quiz" element={<QuizCreator />} />
        </Routes>
    </Router>
      </div>
  );
}

export default App;