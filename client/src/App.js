import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import About from './components/About';
import Route from './components/Route';
import Contact from './components/Contact';
import Signup from './components/Signup';
import LoginForm from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <h1 className="text-center mt-4"><marquee width = "50%">BOOK YOUR TICKET TODAY!</marquee></h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/route" element={<Route />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
