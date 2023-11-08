
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer-clean">
      <h3>Follow Us:</h3>
      <div className="social-container">
        <p>
          <a href="https://www.youtube.com" className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a href="https://www.facebook.com" className="facebook social">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.twitter.com" className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://www.instagram.com" className="instagram social">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </p>
      </div>
      <div className="company-info">
        <p>Our company is dedicated to providing high-quality services.</p>
        <p>Location: 123 Main Street, City, Country</p>
        <p>Telephone: +1 (123) 456-7890</p>
        <p>Email: info@bustrack.com</p>
      </div>
    </footer>
  );
}

export default Footer;
