import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"> 
          BusTrack
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
              <Link to="/" className="nav-link active"> 
                Home
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
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search For Routes Here..."
              aria-label="Search"
            />
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
