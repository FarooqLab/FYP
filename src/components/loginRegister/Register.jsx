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

    // Save user data to local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    // Optionally, you can redirect the user to the login page after registration
    // history.push("/login");
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
            {/* {errors.Name && <p className="error-msg">{errors.Name.message}</p>} */}

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
            {/* {errors.Email && (
              <p className="error-msg">{errors.Email.message}</p>
            )} */}

            <label htmlFor="">Password</label>
            <input className={errors.Password ? "password-error" : ""}
              type="password"
              {...register("Password", { required: true, minLength: 4 })}
            />

            <input type="submit" value="Register" />
          </form>
          <div className="bottom-section">
            <p className="signin-text">
              Alredy have an account? <Link to="/login">Login in</Link>
            </p>
          </div>
        </div>

        {/* Back to Home & Sign-in Section */}
      </div>

      <div className="right-side">
        <h1 className="font-bold text-3xl text-[#442c48]">Welcome<br/><span>to</span><br/><span>FitNurish</span> </h1>
      </div>
    </div>
  );
};

export default Register;
