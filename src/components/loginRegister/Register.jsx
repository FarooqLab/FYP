import "../../assets/loginRegister-css/register.css";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5"; // Back Arrow Icon
import { Link } from "react-router-dom"; // For navigation
import { TiHome } from "react-icons/ti";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("submitting form", data);
  };

  return (
    <div className="parent-dev">
      <div className="left-side">
        <Link to="/" className="back-home">
          <TiHome  className="back-icon" />
        </Link>
        <div className="form-container">
          <FaUserCircle className="user-icon" />
          <h2>Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Username</label>
            <input
              className={errors.Name ? "name-error" : ""}
              {...register("Name", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Should be at least 3 characters",
                },
              })}
            />
            {errors.Name && <p className="error-msg">{errors.Name.message}</p>}

            <label>Email</label>
            <input
              className={errors.Email ? "email-error" : ""}
              type="email"
              {...register("Email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            {errors.Email && (
              <p className="error-msg">{errors.Email.message}</p>
            )}

            <label>Password</label>
            <input
              type="password"
              {...register("Password", { required: true, minLength: 4 })}
            />

            <input type="submit" value="Register" />
          </form>
          <div className="bottom-section">
            <p className="signin-text">
              Alredy have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>

        {/* Back to Home & Sign-in Section */}
      </div>

      <div className="right-side">
        <h1>Welcome Back</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          reprehenderit! Facere ex eum explicabo, dolorum rerum ipsum distinctio
          inventore voluptatibus.
        </p>
      </div>
    </div>
  );
};

export default Register;
