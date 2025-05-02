import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './bmi.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Bmi = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch userId from navigate state OR from localStorage
  useEffect(() => {
    if (location.state?.userId) {
      setUserId(location.state.userId);
    } else {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        // Agar userId na ho, back to login
        navigate('/login');
      }
    }
  }, [location.state, navigate]);

  const calculateBmi = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiResult = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiResult);

      if (bmiResult < 18.5) {
        setStatus("Underweight");
      } else if (bmiResult >= 18.5 && bmiResult < 25) {
        setStatus("Normal");
      } else if (bmiResult >= 25 && bmiResult < 30) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }
    } else {
      alert("Please enter both height and weight.");
    }
  };

  const resetValues = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
  };

  const goToExercisePlan = () => {
    navigate("/exercise", {
      state: { bmiCategory: status, bmiScore: bmi, userId }
    });
  };

  return (
    <div className="bmi-container">
      <div className="bmi-calculator">
        <h1>BMI Calculator</h1>

        <form onSubmit={handleSubmit(calculateBmi)} className="input-field">
          <label>Height (cm)</label>
          <input
            {...register("height", { required: true })}
            type="number"
            id="height"
            onChange={(e) => setHeight(e.target.value)}
            value={height}
            placeholder="Enter your height (cm)"
            className="input-box"
          />
          {errors.height && <p className="error-text">Height is required</p>}
        </form>

        <div className="input-field">
          <label>Weight (kg)</label>
          <input
            {...register("weight", { required: true })}
            type="number"
            id="weight"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            placeholder="Enter your weight (kg)"
            className="input-box"
          />
          {errors.weight && <p className="error-text">Weight is required</p>}
        </div>

        <div className="bmi-button">
          <button type="button" onClick={calculateBmi}>Calculate</button>
          <button type="button" onClick={resetValues}>Reset</button>
        </div>

        {bmi && (
          <div className="bmi-result">
            <h2>Your BMI: {bmi}</h2>
            <p>Status: {status}</p>

            <button className="show-exercise-plan" onClick={goToExercisePlan}>
              <span>↓</span> Go to Exercise Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bmi;
