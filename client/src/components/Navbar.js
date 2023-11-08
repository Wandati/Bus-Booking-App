import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, userRole }) {

  const navigate = useNavigate();
  const handleLogout = () => {
   
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");

  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Bus Booking App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/routes" className="nav-link active">
                Routes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link active">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link active">
                Contact Us
              </Link>
            </li>
            {isLoggedIn && userRole === "Customer" && (
              <>
                <li className="nav-item">
                  <Link to="/bookings" className="nav-link active">
                    My Bookings
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link active"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
            {isLoggedIn && userRole === "BusOwner" && (
              <>
                <li className="nav-item">
                  <Link to="/busOwner" className="nav-link active">
                    Bus Owner Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link active"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
            {isLoggedIn && userRole === "Admin" && (
              <>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link active">
                    Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link active"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link active">
                    Sign-Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active">
                    Login
                  </Link>
                </li>
              </>
            )}
            </ul>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
