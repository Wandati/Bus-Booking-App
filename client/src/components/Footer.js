import React from 'react';
import { FaRegEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';

const App = () => {
  return (
    <div className="app">
      {/* Welcome to BusTrack */}
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; {new Date().getFullYear()} Your Bus Booking Service. All rights reserved.</p>
            <p>
              <FaRegEnvelope /> info@bustrack.com
            </p>
            <p>
              <FaPhoneAlt /> +1 123 456 7890
            </p>
          </div>
          <div className="col-md-6 text-end">
            <div className="social-icons">
              <a href="https://www.facebook.com">
                <AiFillFacebook />
              </a>

              <a href="https://www.instagram.com">
                <AiFillInstagram />
              </a>

              <a href="https://www.twitter.com">
                <AiFillTwitterCircle />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;