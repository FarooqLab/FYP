import React from 'react';
import logo from '../../assets/images/workout.png'
import '../../assets/home-css/hero.css'
import { Link } from 'react-router-dom';
const HeroSection = () => {
 
  return (
    <section id="/" className="hero-section">
      <div className="hero-content">
        <h1>Your Fitness Journey Starts with<span className='fitnurish'>FitNurish</span></h1>
        <p>Fuel Your Body, Transform Your Life</p>
        <div className="hero-button">
          <Link to='/register'>
          <button>Join Us</button></Link>
          
          {/* <button >Watch Demo</button> */}
        </div>
      </div>
      <div>
        <img src={logo} alt="" className='logo md:h-[550px] h-0 mt-[85px] mr-[-40px]' />
      </div>
    </section>
  );
};

export default HeroSection;