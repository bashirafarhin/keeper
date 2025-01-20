import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader/Loader";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("keeper-token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/profile`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });
          setDetails({
            notes: response.data.user.notes,
            backgroundImageIndex: response.data.user.backgroundImageIndex,
          });
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      {children}
      {loading && <Loader />}
    </>
  );
};

export default UserProtectedWrapper;
