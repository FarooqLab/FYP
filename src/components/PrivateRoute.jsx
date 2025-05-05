import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user-auth", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.success);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
