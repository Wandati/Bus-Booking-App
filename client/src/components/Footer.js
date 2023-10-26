import React from 'react';
import { FaRegEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="container">
      <footer className="footer">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; {new Date().getFullYear()} Your Bus Booking Service. All rights reserved.</p>
            <p>
              <FaRegEnvelope /> lawttym@gmail.com
            </p>
            <p>
              <FaPhoneAlt /> +254715749444
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
      </footer>
    </div>
  );
};

export default Footer;
