import { useState } from "react"
import '../../assets/home-css/profilemenu.css'
import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
const ProfileMenu=()=>{
    const [showDropDown,setShowDropDown]=useState(false)
    return(
      <div className="profile-menu">
        <FaUserCircle className='profile-icon' 
        onClick={()=>setShowDropDown(!showDropDown)}
        />
        {!showDropDown  ? ' ' : 
         <div className="dropdown-menu">
         <Link to="/login"
         >Login</Link>
         <Link to="/register">Register</Link>
         </div>
        }
      </div>
    )
  }
  export default ProfileMenu;