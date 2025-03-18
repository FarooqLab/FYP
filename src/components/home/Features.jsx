import "../../assets/home-css/feature.css";
import { Link } from "react-router-dom";
const Features = () => {
  return (
    <div className="programs" id="feature">
      <h1>The best Features We Offers For You</h1>
      <div className="programs-grid">
        <div className="program-card">
          <h2>BMI</h2>
          <p>
            Body Mass Index (BMI) is a numerical value calculated from a
            person's height and weight. 
          </p>
          <Link to='/bmi' className="learn-more">
          <span>Learn More →</span>
          </Link>
          {/* <a href="/bmi" className="learn-more">
            Learn More →
          </a> */}
        </div>
        <div className="program-card">
          <h2>Exercises</h2>
          <p>
            At FitNurish, we provide a variety of exercise plans tailored to
            different fitness levels and goals. 
          </p>
          <Link to='/exercise' className="learn-more">
          <span>Learn More →</span>
          </Link>
        </div>
        <div className="program-card">
          <h2>BMR</h2>
          <p>
            Basal Metabolic Rate (BMR) represents the calories your body burns
            at rest to maintain vital functions. 
          </p>
          <Link to='/bmr' className="learn-more">
          <span>Learn More →</span>
          </Link>
        </div>
        <div className="program-card">
          <h2>Weight Loss</h2>
          <p>
            At FitNurish, we use your BMR to determine your daily calorie needs
            and create a personalized diet plan.
          </p>
          <Link to='/bmr' className="learn-more">
          <span>Learn More →</span>
          </Link>
        </div>
      </div>
      <div className="call-to-action">
        <p>
          Stop searching, start thriving! We’ve handpicked features just for
          you. Unlock your potential, from fitness feats to career climbs. Let’s
          make magic happen!
        </p>
      </div>
    </div>
  );
};

export default Features;
