// import React from "react";
// import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Admin from "./components/Admin";
// import LoginForm from "./components/Login";
// import Footer from "./components/footer";
// // import AuthFormToggle from "./components/AuthFormToggle";
// import Place from "./components/Place";
// import PlaceById from "./components/PlaceById";
// import Bus from "./components/Bus";
// import SignUpForm from "./components/Signup";
// import BookingById from "./components/BookingById";
// import Booking from "./components/Booking";
// import Payment from "./components/Payment";
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <div>
//         <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//         <div className="container">
//           <Routes>
//               <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/routes" element={<Place />} />
//             <Route path="/buses" element={<Bus />} />
//             <Route path="/routes/:id" element={<PlaceById />} />
//             <Route path="/payments/:id" element={<Payment />} />
//             <Route
//               path="/login"
//               element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
//             />

//             <Route path="/bookings/" element={<Booking />} />
//             <Route path="/bookings/:id" element={<BookingById />} />
//             <Route path="/signup" element={<SignUpForm />} />
//           </Routes>
//         </div>
//         {/* <AuthFormToggle /> */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
// import Admin from "./components/Admin";
import LoginForm from "./components/Login";
// import Footer from "./components/Footer";
import Place from "./components/Place";
import PlaceById from "./components/PlaceById";
// import Bus from "./components/Bus";
import NotFound from "./components/NotFound";
import SignUpForm from "./components/Signup";
// import BookingById from "./components/BookingById";
import Booking from "./components/Booking";
import Payment from "./components/Payment";
import ADasboard from "./components/ADasboard";
import Users from "./components/Users";
import UsersById from "./components/UsersById";
import AdRoutes from "./components/AdRoutes";
import BDashboard from "./components/BDashboard";
import "./App.css";
// import Test from "./components/Test";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="wrapper">
        <div className="content">
          <Navbar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userRole={userRole}
          />
          <Routes>
            <Route path="/" element={<Home setUserRole={setUserRole} />} />
            <Route
              path="/about"
              element={<About setUserRole={setUserRole} />}
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/contact"
              element={<Contact setUserRole={setUserRole} />}
            />
            <Route
              path="/routes"
              element={<Place setUserRole={setUserRole} />}
            />
            {/* <Route path="/test" element={<Test setUserRole={setUserRole} />} /> */}
            <Route
              path="/admin"
              element={
                <ADasboard setUserRole={setUserRole} userRole={userRole} />
              }
            />
            <Route
              path="/users"
              element={<Users setUserRole={setUserRole} userRole={userRole} />}
            />
            <Route
              path="/users/:id"
              element={
                <UsersById setUserRole={setUserRole} userRole={userRole} />
              }
            />
            {/* <Route path="/buses" element={<Bus setUserRole={setUserRole} />} /> */}
            <Route
              path="/routes/:id"
              element={<PlaceById setUserRole={setUserRole} />}
            />
            <Route
              path="/ad_routes"
              element={
                <AdRoutes setUserRole={setUserRole} userRole={userRole} />
              }
            />
            <Route
              path="/busOwner"
              element={<BDashboard setUserRole={setUserRole} />}
            />
            <Route
              path="/payments/:id"
              element={
                <Payment userRole={userRole} setUserRole={setUserRole} />
              }
            />
            <Route
              path="/login"
              element={
                <LoginForm
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              }
            />
            <Route
              path="/bookings/"
              element={<Booking setUserRole={setUserRole} />}
            />
            {/* <Route
              path="/bookings/:id"
              element={<BookingById setUserRole={setUserRole} />}
            /> */}
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;