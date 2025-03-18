import { useState } from "react";
import "./calorie.css"; // Correctly import the CSS file

const CalorieCal = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!gender || !age || !height || !weight) {
      setError('Please fill in all fields');
      setCalories(null);
      setDietPlan(null);
      return;
    }

    const calculation = 10 * weight + 6.25 * height - 5 * age;
    let calculatedCalories = 0;

    switch (gender) {
      case 'male':
        calculatedCalories = calculation + 5;
        break;
      case 'female':
        calculatedCalories = calculation - 161;
        break;
      default:
        calculatedCalories = 0;
    }

    if (calculatedCalories > 0) {
      setCalories(calculatedCalories);
      setDietPlan(createDietPlan(calculatedCalories));
      setError('');
    } else {
      setError('Invalid input values');
      setCalories(null);
      setDietPlan(null);
    }
  };

  const createDietPlan = (calories) => {
    const breakfast = [
      {
        name: 'Oatmeal',
        calories: Math.round(calories * 0.25),
        weight: Math.round((calories * 0.25) / 4),
      },
      {
        name: 'Egg',
        calories: Math.round(calories * 0.05),
        weight: Math.round((calories * 0.05) / 3.5),
      },
    ];

    const lunch = [
      {
        name: 'Chicken Breast with Vegetables',
        calories: Math.round(calories * 0.5),
        weight: Math.round((calories * 0.5) / 3.5),
      },
      {
        name: 'Broccoli',
        calories: Math.round(calories * 0.05),
        weight: Math.round((calories * 0.05) / 0.5),
      },
    ];

    const dinner = [
      {
        name: 'Cottage Cheese',
        calories: Math.round(calories * 0.25),
        weight: Math.round((calories * 0.25) / 4),
      },
      {
        name: 'Apple',
        calories: Math.round(calories * 0.05),
        weight: Math.round((calories * 0.05) / 0.5),
      },
    ];

    return { breakfast, lunch, dinner };
  };
  return (
    <div className="app-container">
      <div className="calculator-container">
        <div className="form-section">
          <h1>Calorie Calculator</h1>
          <form onSubmit={handleSubmit} className="calculator-form">
            <div className="form-group">
              <label>Gender:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  Female
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age (years)</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-btn">
              Calculate Calories
            </button>
          </form>
        </div>

        <div className="result-section">
          {error && <div className="error-message">{error}</div>}
          
          {calories && (
            <div className="results-container">
              <h2>Your Results</h2>
              <div className="calorie-result">
                <span>Daily Calories:</span>
                <span className="calorie-number">{calories}</span>
              </div>
              
              {dietPlan && (
                <div className="diet-plan">
                  <h3>Recommended Diet Plan</h3>
                  <div className="meal-plan">
                    <div className="meal">
                      <h4>Breakfast</h4>
                      {dietPlan.breakfast.map((item, index) => (
                        <div key={index} className="meal-item">
                          {item.name} - {item.calories}kcal ({item.weight}g)
                        </div>
                      ))}
                    </div>
                    <div className="meal">
                      <h4>Lunch</h4>
                      {dietPlan.lunch.map((item, index) => (
                        <div key={index} className="meal-item">
                          {item.name} - {item.calories}kcal ({item.weight}g)
                        </div>
                      ))}
                    </div>
                    <div className="meal">
                      <h4>Dinner</h4>
                      {dietPlan.dinner.map((item, index) => (
                        <div key={index} className="meal-item">
                          {item.name} - {item.calories}kcal ({item.weight}g)
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieCal;
