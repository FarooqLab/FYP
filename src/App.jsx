
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/loginRegister/login";
import Register from "./components/loginRegister/Register";
import Bmi from "./components/BMI/Bmi";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/bmi" element={<Bmi/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
