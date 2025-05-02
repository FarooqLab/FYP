import "../../assets/loginRegister-css/register.css";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.some((user) => user.Email === data.Email);
    if (userExists) {
      toast.error("User already exists!");
      return;
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Registered successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1000); // delay for user to see toast
  };

  return (
    <div className="parent-dev">
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
              className={errors.Name ? "name-error" : ""}
              {...register("Name", { required: true, minLength: 3 })}
            />

            <label>Email</label>
            <input
              className={errors.Email ? "email-error" : ""}
              type="email"
              {...register("Email", { required: true })}
            />

            <label>Password</label>
            <input
              className={errors.Password ? "password-error" : ""}
              type="password"
              {...register("Password", { required: true, minLength: 4 })}
            />

            <input type="submit" value="Register" />
          </form>
          <div className="bottom-section">
            <p className="signin-text">
              Already have an account? <Link to="/login">Login in</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="right-side">
        <h1 className="font-bold text-3xl text-[#442c48]">
          Welcome
          <br />
          <span>to</span>
          <br />
          <span>FitNurish</span>
        </h1>
      </div>
    </div>
  );
};

export default Register;
