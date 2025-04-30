import "../../assets/loginRegister-css/login.css";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.Email === data.email && user.Password === data.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      toast.success("Login successful!");

      // ✅ Get the redirect path and navigate there
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");

      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="parent-dev">
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
              className={errors.email ? "email-error" : ""}
              {...register("email", { required: true })}
            />
            <label>Password</label>
            <input
              type="password"
              className={errors.password ? "password-error" : ""}
              {...register("password", { required: true, minLength: 4 })}
            />
            <input type="submit" value="Submit" />
          </form>
          <div className="bottom-section">
            <p className="signin-text">
              Not have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="right-side">
        <h1 className="font-bold text-3xl text-[#442c48]">
          Welcome
          <br />
          <span>Back</span>
        </h1>
      </div>
    </div>
  );
};

export default Login;
