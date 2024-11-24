import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Terms from './Pages/Terms/Terms';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';

function App() {


  return (
      <div className="App">
    <Router>
        <Routes>
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
    </Router>
      </div>
  );
}

export default App;