import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/home-css/footer.css';
import Exercise from '../../pages/Exercise';

const footerSections = [
  {
    title: 'FitNurish',
    items: [
      { name: 'Why us', path: '/why-us' },
      { name: 'Security', path: '/security' },
      { name: 'Partnership', path: '/partnership' },
    ],
  },
  {
    title: 'Basic Exercises',
    items: [
      { name: 'Strength Training', path: '/exercise' },
      { name: 'Cardio', path: '/exercise' },
      { name: 'Weight Loss', path: '/exercise' },
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

// Mapping for pop-up messages
const popupMessages = {
  '/why-us': 'Our Support Center is here to help you. Contact us anytime.',
  '/partnership': 'Our Support Center is here to help you. Contact us anytime.',
  '/terms': 'These are the Terms & Conditions of using FitNurish. Make sure you read and understand them.',
  '/privacy': 'We respect your privacy. Your data is secured and will never be shared.',
  '/security': 'Security is our top priority. We use the latest technologies to keep your data safe.',
  '/support': 'Our Support Center is here to help you. Contact us anytime.',
};

const Footer = () => {
  const [popupContent, setPopupContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleItemClick = (path) => {
    if (popupMessages[path]) {
      setPopupContent(popupMessages[path]);
      setShowPopup(true);
    }
  };

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
                    <span
                      className="footer-link"
                      onClick={() => handleItemClick(item.path)}
                      style={{ cursor: 'pointer', color: 'teal' }}
                    >
                      {item.name}
                    </span>
                  ) : (
                    item.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>©2025 (FarooqLab). All Copyrights reserved.</p>
      </div>

      {/* Popup Box */}
      {showPopup && (
        <div className="footer-popup-overlay">
          <div className="footer-popup-box">
            <p>{popupContent}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
