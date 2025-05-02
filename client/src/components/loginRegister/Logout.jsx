import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/logout",{},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Logged out successfully!");
        localStorage.removeItem("user"); 
        navigate("/login");
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default Logout;
