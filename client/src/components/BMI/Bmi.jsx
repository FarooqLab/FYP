import { useState } from "react";
import { useForm } from "react-hook-form";
import { data } from "react-router";
import './bmi.css'
import ExercisePlan from "../exercises/ExercisePlan";

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

  const calculateBmi = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiResult = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiResult);
      if (bmiResult < 18) {
        setStatus("Under weight");
      } else if (bmiResult >= 18.5 && bmiResult < 24.9) {
        setStatus("Normal weight");
      } else if (bmiResult >= 25 && bmiResult < 29.9) {
        setStatus("Over weight");
      } else {
        setStatus("Obese");
      }
    } else {
      alert("Please Enter both height and weight");
    }
  };
  const resetValues = () => {
    setHeight("");
    setWeight("");
    setBmi("");
  };
  return (
    <div className="bmi-container">
      <div className="bmi-calculator">
        <h1>BMI Calculator</h1>
        <div onSubmit={handleSubmit(data)} className="input-field">
          <label>Height</label>
          <input
            {...register("height", { required: true })}
            
            type="number"
            id="height"
            onChange={(e) => {
              setHeight(e.target.value);
            }}
            value={height}
            placeholder="Enter you height"
          />
                    {errors.height && <p>Enter Height{console.log("error")}</p>}
        </div>
        <div className="input-field">
          <label>Weight</label>
          <input
            {...register("weight", { required: true })}
            type="number"
            id="weigh"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            value={weight}
            placeholder="Enter your weight"
          />
        </div>
        <div className="bmi-button">
          <button onClick={calculateBmi}>Calculate</button>
          <button onClick={resetValues}>Reset</button>

        </div>

        {bmi && (
          <div className="bmi-result">
            <h2>Your BMI:{bmi}</h2>
            <p>Status:{status}</p>
          </div>
        )}
      </div>
       {/* Show Exercise Plan below BMI results
       {status && <ExercisePlan status={status} />} */}
    </div>
  );
};

export default Bmi;
