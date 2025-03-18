import "../../assets/loginRegister-css/login.css";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="parent-dev">
      <div className="left-side">
        <Link to="/" className="back-home">
          <TiHome className="back-icon" />
        </Link>
        <div className="form-container">
          <FaUserCircle className="user-icon" />
          <h2>Login</h2>
          <form action="" onSubmit={handleSubmit((data) => console.log(data))}>
            <label htmlFor="">Email</label>
            <input type="email" 
            className={errors.email? "email-error" : ""}
            {...register("email", { required: true })} />
            <label htmlFor="">Password</label>
            <input type="password" 
            className={errors.password? 'password-error': ""}
            {...register('password', { required: true ,minLength:4})} />
            <input type="submit" value='Submit'/>
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
