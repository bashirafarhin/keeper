import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setDetails } = useContext(UserContext);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const [login, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setLoginDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, login, config );
      localStorage.setItem("keeper-token", response.data.token);
      setDetails({
        notes : response.data.user.notes,
        backgroundImageIndex : response.data.user.backgroundImageIndex
      });
      setLoginDetails({
        email: "",
        password: "",
      });
      navigate(`/`);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginUsingGoogle = async (email) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/loginGoogle`, { email }, config );
      localStorage.setItem("keeper-token", response.data.token);
      setDetails({
        notes : response.data.user.notes,
        backgroundImageIndex : response.data.user.backgroundImageIndex
      });
      setLoginDetails({
        email: "",
        password: "",
      });
      navigate(`/`);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const buttonStyles = {
    backgroundColor: "#3B71CA",
    display: "block",
    height: "9%",
    width: "90%",
    borderRadius: 7,
    fontWeight: "bold",
  };

  return (
    <>
      <div className="login-container">
        <div className="login-page-logo">Keeper</div>
        <form className="login-form">
          <input
            type="email"
            className="login-input"
            onChange={handleChange}
            name="email"
            placeholder="Email Address"
            value={login.email}
            autoComplete="on"
          />
          <input
            type="password"
            className="login-input"
            onChange={handleChange}
            name="password"
            placeholder="password"
            value={login.password}
            autoComplete="on"
          />
          <Button
            style={buttonStyles}
            variant="contained"
            onClick={handleLogin}
          >
            Sign in
          </Button>
          <div className="login-or-option">
            <strong>OR</strong>
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const details = jwtDecode(credentialResponse.credential);
              handleLoginUsingGoogle(details.email);
            }}
            onError={() => {
              setErrorMessage('Error occured on goolge server side.');
              setShowErrorModal(true);
            }}
          />
          <div className="register-button">
            Don't have an Account ?
            <Button disableRipple onClick={() => navigate("/registration")}>
              Register here
            </Button>
          </div>
        </form>
      </div>
      {showErrorModal && (
        <ErrorModal
          Error={errorMessage}
          handleShow={showErrorModal}
          handleHide={() => setShowErrorModal(false)}
        />
      )}
      { loading && <Loader/> }
    </>
  );
};

export default LoginForm;
