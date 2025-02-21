import '../../assets/loginRegister-css/login.css'

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
  };

  return (
    <div className="login-container">
      <FaUserCircle className="user-icon" />
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="register-link">Don't have an account? <a href="#">Sign Up</a></p>
    </div>
  );
};


export default Login