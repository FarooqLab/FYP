import { useState } from "react";
import "./calorie.css"; // Correctly import the CSS file

const CalorieCal = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmr,setBmr]=useState(0)

  const totalCalories=()=>{
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if(!weightNum||!heightNum||!ageNum){
      alert('please enter valid numbers')
      return;
    }
    let result;
    if(gender=='male'){
      result = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) + 5;
    }
    else{
      result = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) - 161;
    }
    setBmr(result.toFixed(2));
    
  }

  const resetValues=()=>{
    setAge('');
    setHeight('');
    setWeight('');
  }
  return (
    <main>
      <div className="cal-main">
        <h2>Calorie Calculator</h2>
        <div className="cal-container">
          <div className="cal-radio">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className="cal-input-fields">
            <label htmlFor="">Age</label>
            <input
              type="number"
              id="age"
              placeholder="Enter Your Age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <label htmlFor="">Height</label>
            <input
              type="number"
              id="height"
              placeholder="Enter Your Height"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />
            <label htmlFor="">Weight</label>
            <input
              type="number"
              id="weight"
              placeholder="Enter Your weight"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="bmr-button">
          <button onClick={totalCalories}>Calculate</button>
          <button onClick={resetValues}>Reset</button>
        </div>
        {
            bmr&&(
              <p>Your BMR is {bmr}</p>
            )
          }

      </div>
    </main>
  );
};

export default CalorieCal;
