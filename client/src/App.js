import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import LoginForm from "./components/Login";
import Footer from "./components/footer";
import AuthFormToggle from "./components/AuthFormToggle";
import Place from "./components/Place";
import PlaceById from "./components/PlaceById";
import Bus from "./components/Bus";
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/routes" element={<Place />} />            
            <Route path="/buses" element={<Bus />} />            
            <Route path="/routes/:id" element={<PlaceById />} />            
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
