import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer-clean">
      <div className="social-container">
        <h3>Social Follow</h3>
        <a href="https://www.youtube.com/c/jamesqquick" className="youtube social">
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a href="https://www.facebook.com/learnbuildteach/" className="facebook social">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com/jamesqquick" className="twitter social">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com/learnbuildteach" className="instagram social">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
      <div className="company-info">
        <p>About: Our company is dedicated to providing high-quality services.</p>
        <p>Location: 123 Main Street, City, Country</p>
        <p>Telephone: +1 (123) 456-7890</p>
      </div>
    </footer>
  );
}

export default Footer;
