

import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/home-css/footer.css';

const footerSections = [
  {
    title: 'FitNurish',
    items: [
      { name: 'About Us', path: '/about' },
      { name: 'Why us', path: '/why-us' },
      { name: 'Security', path: '/security' },
      { name: 'Partnership', path: '/partnership' },
    ],
  },
  {
    title: 'Basic Exercises',
    items: [
      { name: 'Strength Training', path: '/exercise/strength' },
      { name: 'Cardio', path: '/exercise/cardio' },
      { name: 'Weight Loss', path: '/exercise/weight-loss' },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Support Center', path: '/support' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms & Conditions', path: '/terms' },
    ],
  },
  {
    title: 'Contact Us',
    items: [
      { name: '+92 3016139762' },
      { name: 'farooqahmad7589@gmail.com' },
      { name: 'UOS, Sargodha' },
    ],
  },
];


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {footerSections.map((section, index) => (
          <div className="footer-section" key={index}>
            <h4>{section.title}</h4>
            <ul>
              {section.items.map((item, i) => (
                <li key={i}>
                  {item.path ? (
                    <Link to={item.path}>{item.name}</Link>
                  ) : (
                    item.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
export default Footer
