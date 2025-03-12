import React from "react";
import { Link } from "react-scroll";
import "../../assets/home-css/navbar.css";
import logo from "../../assets/images/logo.jpg";
import ProfileMenu from "./ProfileMenu";
const Navbar = () => {
  //menu function

  return (
    <nav className="navbar max-h-[100px]">
      <div className="nav-container">
        <Link to="/" smooth={true} duration={500} className="logo">
          <img
            src={logo}
            alt="FitNurish"
            style={{
              width: "90px",
              height: "80px",
              border: "none",
              outline: "none",
            }}
          />
        </Link>

        <ul className="nav-links">
          <Link to="/" smooth={true} duration={500}>
            <li>Home</li>
          </Link>
          <Link to="feature" smooth={true} duration={500}>
            <li>Features</li>
          </Link>
          <Link to="team" smooth={true} duration={500}>
            <li>Our Team</li>
          </Link>
          <Link to="faq" smooth={true} duration={500}>
            <li>FAQ's</li>
          </Link>
        </ul>
      </div>
      <div>
        <ProfileMenu/>
      </div>
    </nav>
  );
};

export default Navbar;
