import React, { useState, useEffect } from 'react';

const MultiMealPlanner = () => {
  const [foods, setFoods] = useState([]);
  const [selected, setSelected] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [mealPlans, setMealPlans] = useState([]);
  const [planName, setPlanName] = useState("");
  const [requiredCalories, setRequiredCalories] = useState(null);
  const [calorieMatched, setCalorieMatched] = useState(false);

  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem('mealPlans')) || [];
    const bmr = JSON.parse(localStorage.getItem('userBMR'));

    setRequiredCalories(bmr || null);
    setMealPlans(savedPlans);

    const defaultFoods = [
      { name: "Chicken Breast", calories_per_100g: 165 },
      { name: "Rice", calories_per_100g: 130 },
      { name: "Broccoli", calories_per_100g: 55 },
      { name: "Eggs", calories_per_100g: 155 },
      { name: "Almonds", calories_per_100g: 579 },
      { name: "Oats", calories_per_100g: 389 },
      { name: "Milk", calories_per_100g: 42 },
      { name: "Banana", calories_per_100g: 89 },
      { name: "Apple", calories_per_100g: 52 },
      { name: "Salmon", calories_per_100g: 208 },
      { name: "Quinoa", calories_per_100g: 120 },
      { name: "Avocado", calories_per_100g: 160 },
      { name: "Sweet Potato", calories_per_100g: 86 },
      { name: "Tofu", calories_per_100g: 76 },
      { name: "Yogurt", calories_per_100g: 59 },
      { name: "Peanut Butter", calories_per_100g: 588 },
      { name: "Spinach", calories_per_100g: 23 },
      { name: "Mushrooms", calories_per_100g: 22 },
      { name: "Cucumber", calories_per_100g: 16 },
      { name: "Cheese", calories_per_100g: 402 },
      { name: "Lentils", calories_per_100g: 116 },
      { name: "Beef", calories_per_100g: 250 }
    ];

    setFoods(defaultFoods);
  }, []);

  useEffect(() => {
    const total = selected.reduce((acc, item) => acc + item.calories_per_100g, 0);
    setTotalCalories(total);

    if (requiredCalories && Math.round(total) === Math.round(requiredCalories)) {
      setCalorieMatched(true);
    } else {
      setCalorieMatched(false);
    }
  }, [selected, requiredCalories]);

  const handleSelect = (food) => {
    const already = selected.find(item => item.name === food.name);
    if (already) {
      setSelected(selected.filter(f => f.name !== food.name));
    } else {
      setSelected([...selected, food]);
    }
  };

  const handleSavePlan = () => {
    if (!planName.trim()) {
      alert("Please enter a name for the plan.");
      return;
    }

    const newPlan = {
      name: planName,
      foods: selected,
      totalCalories,
      id: Date.now()
    };

    const updatedPlans = [...mealPlans, newPlan];
    setMealPlans(updatedPlans);
    localStorage.setItem('mealPlans', JSON.stringify(updatedPlans));

    setSelected([]);
    setPlanName("");
    setTotalCalories(0);
    setCalorieMatched(false);
  };

  const handleDeletePlan = (id) => {
    const updated = mealPlans.filter(plan => plan.id !== id);
    setMealPlans(updated);
    localStorage.setItem('mealPlans', JSON.stringify(updated));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className=" bg-gray-600 bg-opacity-80  min-h-screen w-full rounded-xl text-white p-6 max-w-6xl mx-auto ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-green-400">🍽️ Meal Planner</h2>
          {requiredCalories ? (
            <p className="text-xl text-yellow-400">
              Required Calories (BMR):{" "}
              <span className="font-bold text-white">
                {Math.round(requiredCalories)} kcal
              </span>
            </p>
          ) : (
            <p className="text-red-400 text-xl font-semibold">
              ⚠️ You have not calculated your required calories yet!
            </p>
          )}
        </div>

        <input
          type="text"
          placeholder="Enter Plan Name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="w-full p-3 rounded-lg shadow text-black mb-4"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {foods.map((food) => (
            <label
              key={food.name}
              className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow text-black cursor-pointer hover:bg-blue-100 transition"
            >
              <input
                type="checkbox"
                onChange={() => handleSelect(food)}
                checked={selected.some((f) => f.name === food.name)}
                className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
              />
              <span>
                {food.name} ({food.calories_per_100g} kcal)
              </span>
            </label>
          ))}
        </div>

        <div className="mt-2 flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-3">
          <div>
            <p
              className={`text-xl font-semibold ${
                calorieMatched ? "text-green-400" : "text-yellow-400"
              }`}
            >
              🔥 Total Calories:{" "}
              <span
                className={`${
                  calorieMatched ? "text-green-300 font-bold" : "text-red-500"
                }`}
              >
                {totalCalories} kcal
              </span>
            </p>
            {calorieMatched && (
              <p className="text-green-400 mt-1 font-medium text-lg">
                🎉 You have reached your required calorie goal!
              </p>
            )}
          </div>

          <button
            onClick={handleSavePlan}
            className="bg-green-600 px-6 py-2 rounded text-white font-semibold hover:bg-green-700 transition"
          >
            Save Plan
          </button>
        </div>

        {mealPlans.length > 0 && (
          <div className="mt-10">
            <h3 className="text-3xl font-bold mb-4 text-blue-300">
              📋 Saved Meal Plans
            </h3>
            <div className="grid gap-6">
              {mealPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white text-black rounded-xl shadow p-5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-2xl font-bold text-green-700">
                      {plan.name}
                    </h4>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ❌ Delete
                    </button>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Total Calories: <strong>{plan.totalCalories} kcal</strong>
                  </p>
                  <ul className="list-disc ml-5 text-gray-800">
                    {plan.foods.map((f, idx) => (
                      <li key={idx}>
                        {f.name} ({f.calories_per_100g} kcal)
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiMealPlanner;
