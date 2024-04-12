import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} ></Route>
        <Route exact path="/login" element={<LoginPage />} ></Route>
        <Route exact path="/profile" element={<ProfilePage />} ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
