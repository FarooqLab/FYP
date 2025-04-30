import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/loginRegister/Login";
import Register from "./components/loginRegister/Register";
import Bmi from "./components/BMI/Bmi";
import Exercise from "./pages/Exercise";
import CalorieCal from "./components/calorieCalculator/CalorieCal";
import AIPromptBar from "./components/AI-Prompt/Ai-prompt";
import MultiMealPlanner from "./components/customFood/CustomFood";
import OurTeam from "./components/home/OurTeam";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bmi" element={<Bmi />} />
          <Route path="/exercise/*" element={<Exercise />} />
          <Route path="/bmr" element={<CalorieCal />} />
          <Route path="/ai" element={<AIPromptBar />} />
          <Route path="/custom" element={<MultiMealPlanner />} />
          <Route path="/about" element={< OurTeam/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
