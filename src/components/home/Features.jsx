import "../../assets/home-css/feature.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Features = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setIsLoggedIn(!!user);
  }, []);

  const handleFeatureClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      // Save intended destination
      localStorage.setItem("redirectAfterLogin", path);
      navigate("/login");
    }
  };

  return (
    <div className="programs" id="feature">
      <h1>The best Features We Offers For You</h1>
      <div className="programs-grid">
        <div className="program-card">
          <h2>BMI</h2>
          <p>Body Mass Index (BMI) is a numerical value calculated from a person's height and weight.</p>
          <button className="learn-more" onClick={() => handleFeatureClick("/bmi")}>Learn More →</button>
        </div>
        <div className="program-card">
          <h2>Exercises</h2>
          <p>At FitNurish, we provide a variety of exercise plans tailored to different fitness levels and goals.</p>
          <button className="learn-more" onClick={() => handleFeatureClick("/exercise")}>Learn More →</button>
        </div>
        <div className="program-card">
          <h2>BMR</h2>
          <p>Basal Metabolic Rate (BMR) represents the calories your body burns at rest to maintain vital functions.</p>
          <button className="learn-more" onClick={() => handleFeatureClick("/bmr")}>Learn More →</button>
        </div>
        <div className="program-card">
          <h2>Customize Plan</h2>
          <p>We use your BMR to determine your daily calorie needs and you can create a personalized diet plan.</p>
          <button className="learn-more" onClick={() => handleFeatureClick("/custom")}>Learn More →</button>
        </div>
      </div>
      <div className="call-to-action">
        <p>Stop searching, start thriving! Unlock your potential with our handpicked features. Let’s make magic happen!</p>
      </div>
    </div>
  );
};

export default Features;
