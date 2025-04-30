import { useEffect, useState } from "react";
import "../../assets/home-css/profilemenu.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ProfileMenu = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setShowDropDown(false);
    navigate("/login");
  };

  return (
    <div className="profile-menu">
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
