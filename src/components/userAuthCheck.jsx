import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user-auth', {
          withCredentials: true, 
        });
        console.log('Auth response:', res); 

        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('Error during auth check:', error); 
        setIsAuthenticated(false);
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuthCheck;
