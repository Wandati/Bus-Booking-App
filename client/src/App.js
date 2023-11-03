import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import LoginForm from "./components/Login";
import Footer from "./components/footer";
// import AuthFormToggle from "./components/AuthFormToggle";
import Place from "./components/Place";
import PlaceById from "./components/PlaceById";
import Bus from "./components/Bus";
import SignUpForm from "./components/Signup";
import BookingById from "./components/BookingById";
import Booking from "./components/Booking";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/routes" element={<Place />} />
            <Route path="/buses" element={<Bus />} />
            <Route path="/routes/:id" element={<PlaceById />} />
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route path="/bookings/" element={<Booking/>} />
            <Route path="/bookings/:id" element={<BookingById />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </div>
        {/* <AuthFormToggle /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
