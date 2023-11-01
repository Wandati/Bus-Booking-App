import React from "react";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import LoginForm from "./components/Login";
import Admin from "./components/Admin";
import Footer from "./components/footer";
import Place from "./components/Place";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/routes" element={< Place />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
