import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/loginRegister/Login";
import Register from "./components/loginRegister/Register";
import Bmi from "./components/BMI/Bmi";
import Exercise from "./pages/Exercise";
import CalorieCal from "./components/calorieCalculator/CalorieCal";
import AIPromptBar from "./components/AI-Prompt/Ai-prompt";
import MultiMealPlanner from "./components/customFood/CustomFood";
import OurTeam from "./components/home/OurTeam";
import PrivateRoute from "./components/PrivateRoute";
import useAuthCheck from "./components/userAuthCheck";
const App = () => {
  const { isAuthenticated, loading } = useAuthCheck();

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/bmi"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Bmi />
              </PrivateRoute>
            }
          />
          <Route
            path="/exercise/*"
            element={
              <PrivateRoute>
                <Exercise />
              </PrivateRoute>
            }
          />
          <Route
            path="/bmr"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CalorieCal />
              </PrivateRoute>
            }
          />
          <Route
            path="/custom"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MultiMealPlanner />
              </PrivateRoute>
            }
          />

          <Route path="/ai" element={<AIPromptBar />} />
          <Route path="/about" element={<OurTeam />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
