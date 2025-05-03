import React, { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 12;

const MultiMealPlanner = () => {
  const [foods, setFoods] = useState([]);
  const [selected, setSelected] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [mealPlans, setMealPlans] = useState([]);
  const [planName, setPlanName] = useState("");
  const [requiredCalories, setRequiredCalories] = useState(null);
  const [calorieMatched, setCalorieMatched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem("mealPlans")) || [];
    const bmr = JSON.parse(localStorage.getItem("userBMR"));
    setRequiredCalories(bmr || null);
    setMealPlans(savedPlans);

    // Sample Pakistani + global food items (add more as needed)

    const foodList = [
      { name: "Chicken Biryani", calories_per_100g: 150 },
      { name: "Beef Kebab", calories_per_100g: 290 },
      { name: "Aloo Paratha", calories_per_100g: 250 },
      { name: "Chana Chaat", calories_per_100g: 180 },
      { name: "Nihari", calories_per_100g: 320 },
      { name: "Halwa Puri", calories_per_100g: 400 },
      { name: "Chapli Kebab", calories_per_100g: 310 },
      { name: "Plain Roti", calories_per_100g: 110 },
      { name: "Chicken Karahi", calories_per_100g: 200 },
      { name: "Daal Chawal", calories_per_100g: 160 },
      { name: "Kheer", calories_per_100g: 220 },
      { name: "Lassi", calories_per_100g: 80 },
      { name: "Rice", calories_per_100g: 130 },
      { name: "Broccoli", calories_per_100g: 55 },
      { name: "Eggs", calories_per_100g: 155 },
      { name: "Oats", calories_per_100g: 389 },
      { name: "Apple", calories_per_100g: 52 },
      { name: "Milk", calories_per_100g: 42 },
      { name: "Salmon", calories_per_100g: 208 },
      { name: "Tofu", calories_per_100g: 76 },
      { name: "Lentils", calories_per_100g: 116 },
      { name: "Butter", calories_per_100g: 717 },
      { name: "Jam", calories_per_100g: 280 },
      { name: "Honey", calories_per_100g: 304 },
      { name: "Peanut Butter", calories_per_100g: 588 },
      { name: "Cornflakes", calories_per_100g: 357 },
      { name: "Oatmeal", calories_per_100g: 68 },
      { name: "Banana", calories_per_100g: 89 },
      { name: "Mango", calories_per_100g: 60 },
      { name: "Orange", calories_per_100g: 47 },
      { name: "Dates", calories_per_100g: 277 },
      { name: "Raisins", calories_per_100g: 299 },
      { name: "Almonds", calories_per_100g: 579 },
      { name: "Walnuts", calories_per_100g: 654 },
      { name: "Cashews", calories_per_100g: 553 },
      { name: "Chia Seeds", calories_per_100g: 486 },
      { name: "Flax Seeds", calories_per_100g: 534 },
      { name: "Yogurt", calories_per_100g: 59 },
      { name: "Greek Yogurt", calories_per_100g: 97 },
      { name: "Green Tea", calories_per_100g: 1 },
      { name: "Coffee (black)", calories_per_100g: 2 },
      { name: "Sugar", calories_per_100g: 387 },
      { name: "Coca Cola", calories_per_100g: 42 },
      { name: "Burger", calories_per_100g: 295 },
      { name: "Pizza", calories_per_100g: 266 },
      { name: "Pasta", calories_per_100g: 131 },
      { name: "Macaroni", calories_per_100g: 140 },
      { name: "Shawarma", calories_per_100g: 280 },
      { name: "Ice Cream", calories_per_100g: 207 },
      { name: "Chocolate", calories_per_100g: 546 },
      { name: "Cake", calories_per_100g: 290 },
      { name: "Tandoori Chicken", calories_per_100g: 150 },
      { name: "Pulao", calories_per_100g: 160 },
      { name: "Pakora", calories_per_100g: 320 },
      { name: "Samosa", calories_per_100g: 270 },
      { name: "Dahi Puri", calories_per_100g: 190 },
      { name: "Biryani (Vegetarian)", calories_per_100g: 180 },
      { name: "Palak Paneer", calories_per_100g: 150 },
      { name: "Shahi Paneer", calories_per_100g: 230 },
      { name: "Gulab Jamun", calories_per_100g: 300 },
      { name: "Kachori", calories_per_100g: 250 },
      { name: "Raita", calories_per_100g: 50 },
      { name: "Pav Bhaji", calories_per_100g: 200 },
      { name: "Chole Bhature", calories_per_100g: 320 },
      { name: "Tandoori Roti", calories_per_100g: 100 },
      { name: "Butter Chicken", calories_per_100g: 245 },
      { name: "Lamb Kofta", calories_per_100g: 290 },
      { name: "Vada Pav", calories_per_100g: 240 },
      { name: "Kathi Roll", calories_per_100g: 270 },
      { name: "Aloo Tikki", calories_per_100g: 195 },
      { name: "Methi Paratha", calories_per_100g: 210 },
      { name: "Chicken Shawarma", calories_per_100g: 300 },
      { name: "Rogan Josh", calories_per_100g: 240 },
      { name: "Fried Chicken", calories_per_100g: 250 },
      { name: "Hot Dog", calories_per_100g: 290 },
      { name: "Cheese", calories_per_100g: 402 },
      { name: "Mozzarella Cheese", calories_per_100g: 280 },
      { name: "Nachos", calories_per_100g: 500 },
      { name: "Pineapple", calories_per_100g: 50 },
      { name: "Watermelon", calories_per_100g: 30 },
      { name: "Carrot", calories_per_100g: 41 },
      { name: "Cucumber", calories_per_100g: 16 },
      { name: "Tomato", calories_per_100g: 18 },
      { name: "Cauliflower", calories_per_100g: 25 },
      { name: "Spinach", calories_per_100g: 23 },
      { name: "Zucchini", calories_per_100g: 17 },
      { name: "Asparagus", calories_per_100g: 20 },
      { name: "Green Beans", calories_per_100g: 31 },
      { name: "Bell Peppers", calories_per_100g: 20 },
      { name: "Cabbage", calories_per_100g: 25 },
      { name: "Bitter Gourd", calories_per_100g: 20 },
      { name: "Mushrooms", calories_per_100g: 22 },
      { name: "Eggplant", calories_per_100g: 25 },
      { name: "Artichoke", calories_per_100g: 47 },
      { name: "Olives", calories_per_100g: 115 },
      { name: "Lemon", calories_per_100g: 29 },
      { name: "Coconut", calories_per_100g: 354 },
      { name: "Papaya", calories_per_100g: 43 },
      { name: "Kiwi", calories_per_100g: 61 },
      { name: "Apricots", calories_per_100g: 48 },
    ];

    setFoods(foodList);
  }, []);

  useEffect(() => {
    const total = selected.reduce(
      (acc, item) => acc + (item.calories_per_100g * item.quantity) / 100,
      0
    );
    setTotalCalories(total);
    setCalorieMatched(
      requiredCalories && Math.round(total) === Math.round(requiredCalories)
    );
  }, [selected, requiredCalories]);

  const handleQuantityChange = (name, quantity) => {
    const updated = selected.map((item) =>
      item.name === name ? { ...item, quantity: Number(quantity) } : item
    );
    setSelected(updated);
  };

  const handleSelect = (food) => {
    const exists = selected.find((item) => item.name === food.name);
    if (exists) {
      setSelected(selected.filter((item) => item.name !== food.name));
    } else {
      setSelected([...selected, { ...food, quantity: 100 }]); // Default to 100g
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
      id: Date.now(),
    };
    const updatedPlans = [...mealPlans, newPlan];
    setMealPlans(updatedPlans);
    localStorage.setItem("mealPlans", JSON.stringify(updatedPlans));
    setSelected([]);
    setPlanName("");
    setTotalCalories(0);
    setCalorieMatched(false);
  };

  const handleDeletePlan = (id) => {
    const updated = mealPlans.filter((plan) => plan.id !== id);
    setMealPlans(updated);
    localStorage.setItem("mealPlans", JSON.stringify(updated));
  };

  // Pagination Logic
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);

  const paginatedFoods = filteredFoods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDownloadPlan = (plan) => {
    const content = `
  Plan Name: ${plan.name}
  Total Calories: ${Math.round(plan.totalCalories)} kcal
  
  Foods:
  ${plan.foods
    .map(
      (f) =>
        `- ${f.name} (${f.quantity}g): ${Math.round(
          (f.quantity * f.calories_per_100g) / 100
        )} kcal`
    )
    .join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${plan.name.replace(/\s+/g, "_")}_Plan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')`,
      }}
    >
      <div className="bg-gray-600 bg-opacity-80 min-h-screen w-full rounded-xl text-white p-6 max-w-6xl mx-auto">
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
        <input
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          className="border p-2 mb-4 w-full text-black"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {paginatedFoods.map((food) => {
            const isSelected = selected.find((item) => item.name === food.name);
            return (
              <div
                key={food.name}
                className="p-3 bg-white rounded-xl shadow text-black"
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={() => handleSelect(food)}
                    checked={!!isSelected}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <span>
                    {food.name} ({food.calories_per_100g} kcal/100g)
                  </span>
                </label>
                {isSelected && (
                  <input
                    type="number"
                    min="50"
                    step="50"
                    className="mt-2 w-full p-1 border rounded text-black"
                    value={isSelected.quantity}
                    onChange={(e) =>
                      handleQuantityChange(food.name, e.target.value)
                    }
                    placeholder="grams (e.g., 150)"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
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
                {Math.round(totalCalories)} kcal
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
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
                    <h4 className="text-2xl font-bold text-green-700">
                      {plan.name}
                    </h4>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDownloadPlan(plan)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ⬇️ Download
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌ Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">
                    Total Calories:{" "}
                    <strong>{Math.round(plan.totalCalories)} kcal</strong>
                  </p>
                  <ul className="list-disc ml-5 text-gray-800">
                    {plan.foods.map((f, idx) => (
                      <li key={idx}>
                        {f.name} - {f.quantity}g (
                        {Math.round((f.quantity * f.calories_per_100g) / 100)}{" "}
                        kcal)
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
