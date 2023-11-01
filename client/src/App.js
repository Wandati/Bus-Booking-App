import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import admin from './components/admin'; 
import LoginForm from './components/Login';
import Footer from "./components/footer";
import AuthFormToggle from './components/AuthFormToggle';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <h1 className="text-center mt-4">BOOK YOUR TICKET TODAY!</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<admin />} /> 
            <Route path="/login" element={<LoginForm />} /> 

          </Routes>
        </div>
        <AuthFormToggle />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
