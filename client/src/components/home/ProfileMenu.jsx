import { useEffect, useState } from "react";
import "../../assets/home-css/profilemenu.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProfileMenu = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user-auth", {
          withCredentials: true,
        });

        setIsLoggedIn(res.data.success);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{},{
        withCredentials: true,
      });
      setIsLoggedIn(false);
      setShowDropDown(false);
      toast.success("You have been logged out successfully.");
      navigate("/login");
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <div className="profile-menu">
      <ToastContainer/>
      <FaUserCircle
        className={`profile-icon ${isLoggedIn ? "logged-in" : ""}`}
        onClick={() => setShowDropDown(!showDropDown)}
      />
      {showDropDown && (
        <div className="dropdown-menu">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
