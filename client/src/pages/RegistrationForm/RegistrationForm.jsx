import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import ErrorModal from "../../components/ErrorModal/ErrorModal.jsx"
import { UserContext } from "../../context/UserContext.jsx";
import axios from "axios";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setDetails } = useContext(UserContext);
  const [register, setRegistrationDetails] = useState({
    email: "",
    password: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistrationDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    event.preventDefault();
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, register, config);
      localStorage.setItem("token", response.data.token);
      setDetails({
        notes : response.data.user.notes,
        backgroundImageIndex : response.data.user.backgroundImageIndex
      });
      setRegistrationDetails({
        email: "",
        password: "",
      });
      navigate(`/`);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      setShowErrorModal(true);
    }
  };

  const handleRegistrationUsingGoogle = async (email) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/registerGoogle`,{email}, config);
      localStorage.setItem("token", response.data.token);
      setDetails({
        notes : response.data.user.notes,
        backgroundImageIndex : response.data.user.backgroundImageIndex
      });
      navigate(`/`);
    } catch(err) {
      setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      setShowErrorModal(true);
    }
  };

  const buttonStyles = {
    backgroundColor: "#3B71CA",
    display: "block",
    height: "9%",
    width: "90%",
    borderRadius: 7,
    fontWeight: "bold",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
  };

  return (
    <>
      <div className="registration-container">
        <div className="registration-page-logo">Keeper</div>
        <form className="registration-form">
          <input
            type="email"
            className="registration-input"
            onChange={handleChange}
            name="email"
            placeholder="Email Address"
            value={register.email}
            autoComplete="on"
          />
          <input
            type="password"
            className="registration-input"
            onChange={handleChange}
            name="password"
            placeholder="password"
            value={register.password}
            autoComplete="on"
          />
          <Button
            style={buttonStyles}
            variant="contained"
            onClick={handleRegistration}
          >
            Register
          </Button>
          <div className="registration-or-option">
            <strong>OR</strong>
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const details = jwtDecode(credentialResponse.credential);
              handleRegistrationUsingGoogle(details.email);
            }}
            onError={() => {
              navigate("/registration");
            }}
          />
          <div className="login-button">
            Already Registered ?
            <Button disableRipple onClick={() => navigate("/login")}>
              login here
            </Button>
          </div>
        </form>
        {showErrorModal && (
        <ErrorModal
          Error={errorMessage}
          handleShow={showErrorModal}
          handleHide={() => setShowErrorModal(false)}
        />
      )}
      </div>
    </>
  );
};

export default RegistrationForm;
