import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../assets/images/workout.png';
import '../../assets/home-css/hero.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user-auth', {
          withCredentials: true // important to send the cookie
        });

        if (res.data.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <section id="/" className="hero-section">
      <div className="hero-content">
        <h1>Your Fitness Journey Starts with <span className='fitnurish'>FitNurish</span></h1>
        <p>Fuel Your Body, Transform Your Life</p>
        <div className="hero-button">
          <Link to={isLoggedIn ? "/bmi" : "/register"}>
            <button>{isLoggedIn ? "Get Started" : "Join Us"}</button>
          </Link>
        </div>
      </div>
      <div>
        <img src={logo} alt="" className='logo md:h-[550px] h-0 mt-[85px] mr-[-40px]' />
      </div>
    </section>
  );
};

export default HeroSection;
