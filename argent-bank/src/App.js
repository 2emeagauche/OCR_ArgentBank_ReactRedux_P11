import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signin from './pages/Signin';
import User from './pages/User';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} ></Route>
        <Route exact path="/signin" element={<Signin />} ></Route>
        <Route exact path="/user" element={<User />} ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
