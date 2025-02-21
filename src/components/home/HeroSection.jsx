import React from 'react';
import logo from '../../assets/react.svg'
import '../../assets/home-css/hero.css'
const HeroSection = () => {
  return (
    <section id="/" className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Our Platform</h1>
        <p>Transform your business with our innovative solutions</p>
        <div className="hero-button">
          <button className="primary-button">Start Free Trial</button>
          <button className="secondary-button">Watch Demo</button>
        </div>
      </div>
      <div>
        <img src={logo} alt="" className='logo' />
      </div>
    </section>
  );
};

export default HeroSection;