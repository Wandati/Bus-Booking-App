import React from 'react';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import LoginForm from './components/Login';
import admin from './components/admin'; 
import Footer from "./components/footer"
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <h1 className="text-center mt-4"><marquee width="50%">BOOK YOUR TICKET TODAY!</marquee></h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<admin />} /> 
          </Routes>
        </div>
        <Footer/>
    
      </div>
    </Router>
  );
}

export default App;
