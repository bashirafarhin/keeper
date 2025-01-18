import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../context/UserContext";


const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setDetails } = useContext(UserContext);
  const token = localStorage.getItem('keeper-token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const configWithToken = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          };
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, configWithToken );
          setDetails({
            notes : response.data.user.notes,
            backgroundImageIndex : response.data.user.backgroundImageIndex
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchData();
  }, [token]);
 
  return <>{children}</>;
};

export default UserProtectedWrapper;
