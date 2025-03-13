import React from 'react';
import logo from '../../assets/images/workout.png'
import '../../assets/home-css/hero.css'
import { Link } from 'react-scroll';
const HeroSection = () => {
  return (
    <section id="/" className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Our Platform</h1>
        <p>Transform your business with our innovative solutions</p>
        <div className="flex gap-3 justify-center items-center ">
          <button className="w-[150px] h-[50px] bg-gray-500 hover:bg-gray-400 rounded-lg  hover:text-black font-semibold transition-all">Start Free Trial</button>
          <button className="w-[150px] h-[50px] bg-gray-500 hover:bg-gray-400 rounded-lg hover:text-black font-semibold transition-all">Watch Demo</button>
        </div>
      </div>
      <div>
        <img src={logo} alt="" className='logo md:h-[550px] h-0 mt-[85px] mr-[-40px]' />
      </div>
    </section>
  );
};

export default HeroSection;