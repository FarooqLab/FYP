import "../../assets/loginRegister-css/register.css";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, data, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success("You are registered successfully!");
        reset();
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg?.includes("already")) {
        toast.error("Email already exists");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
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
          <h2>Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Username</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Should be at least 3 characters"
                }
              })}
              className={errors.name ? "name-error" : ""}
            />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}

            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
              className={errors.email ? "email-error" : ""}
            />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}

            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password should be at least 4 characters"
                }
              })}
              className={errors.password ? "password-error" : ""}
            />
            {errors.password && <p className="error-msg">{errors.password.message}</p>}

            <input type="submit" value="Register" />
          </form>

          <div className="bottom-section">
            <p className="signin-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="right-side">
        <h1 className="font-bold text-3xl text-[#442c48]">
          Welcome<br /><span>to</span><br /><span>FitNurish</span>
        </h1>
      </div>
    </div>
  );
};

export default Register;
