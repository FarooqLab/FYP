import "../../assets/loginRegister-css/login.css";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        const { user, token } = response.data;

        localStorage.setItem('userId', user._id);
        if (token) {
          localStorage.setItem('token', token);
        }

        toast.success("You are logged in!");
        reset();

        navigate("/bmi", {
          state: { userId: user._id }
        });
      } else {
        setLoginError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg = error.response?.data?.message || "Login failed. Please try again.";
      setLoginError(msg);
    }
  };

  return (
    <div className="parent-dev">
      <ToastContainer />
      <div className="left-side">
        <Link to="/" className="back-home">
          <TiHome className="back-icon" />
        </Link>
        <div className="form-container">
          <FaUserCircle className="user-icon" />
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={errors.email ? "email-error" : ""}
            />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}

            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 4, message: "Minimum 4 characters required" }
              })}
              className={errors.password ? "password-error" : ""}
            />
            {errors.password && <p className="error-msg">{errors.password.message}</p>}

            {loginError && <p className="error-msg">{loginError}</p>}

            <input type="submit" value="Login" />
          </form>
          <div className="bottom-section">
            <p className="signin-text">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="right-side">
        <h1 className="font-bold text-3xl text-[#442c48]">
          Welcome <br />
          <span>Back</span>
        </h1>
      </div>
    </div>
  );
};

export default Login;
