import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import StepCount from './components/StepCount';
import Navbar from './components/Navbar';
import StepCounter from './components/StepCounter';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<StepCounter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stepCount" element={<StepCount />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;