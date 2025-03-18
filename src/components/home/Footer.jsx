import React from 'react';
import '../../assets/home-css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Why us</li>
            <li>Security</li>
            <li>Partnership</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Basic Exercises</h4>
          <ul>
            <li>Strength Training</li>
            <li>Body Building</li>
            <li>Weight Loss</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            <li>Support Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>+92 3016139762</li>
            <li>contact@example.com</li>
            <li>Uos, Sargodha</li>
          </ul>
        </div>
      </div>
      <div className="newsletter">
        <h4>Subscribe Us</h4>
        <input type="email" placeholder="Enter Your Email" />
        <button>Subscribe</button>
      </div>
      <div className="footer-bottom">
        <p>©2025 (FarooqLab). All Copyrights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;