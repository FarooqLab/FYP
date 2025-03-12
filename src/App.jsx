
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/loginRegister/Login";
import Register from "./components/loginRegister/Register";
import Bmi from "./components/BMI/Bmi";
import Exercise from "./pages/Exercise";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/bmi" element={<Bmi/>}/>
          <Route path="/exercise/*" element={<Exercise/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
