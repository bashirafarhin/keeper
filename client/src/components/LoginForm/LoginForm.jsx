import { useState } from 'react';
import Button from '@mui/material/Button';
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import ErrorModal from '../ErrorModal/ErrorModal';
export default function LoginForm() {
    const navigate = useNavigate();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const config={headers: {'Content-Type': 'application/json'}};
    const [login, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    
    const handleChange= (event) => {
        const { name, value } = event.target;
        setLoginDetails((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        event.preventDefault();
    }

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const { email, password } = login;
        const data = { email, password };
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, data, config);
        if(response.data.id===null){
          setErrorMessage("You're not registered.");
          setShowErrorModal(true);
        } else if(response.data.id===false){
          setErrorMessage("Enter correct Password");
          setShowErrorModal(true);
        } else {
          navigate(`/home/${response.data.id}`);
        }
      } catch (err) {
        navigate('/', { replace: true });
      } finally {
        setLoginDetails({
          email: "",
          password: "",
        });
      }
    };


    const handleLoginUsingGoogle = async (email) => {
      try {
        const data=JSON.stringify({ email : email});
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/register/google`, data, config);
        navigate(`/home/${response.data.id}`);
      } catch (err) {

        // navigate('/', { replace: true });
        setErrorMessage("Try username or password.");
        setShowErrorModal(true);
      } 
    };

    const buttonStyles = {
        backgroundColor : '#3B71CA',
        display: 'block',
        height: '9%',
        width: '90%',
        borderRadius: 7,
        fontWeight: "bold",
      };


    return <>
    <div className='login-container'>
        <div className='login-page-logo'>Keeper</div>
        <form className='login-form'>
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
         <Button style={buttonStyles} variant="contained"  onClick={handleLogin}>Sign in</Button>
         <div className='login-or-option'><strong>OR</strong></div>
         <GoogleLogin
          onSuccess={credentialResponse => {
          const details=jwtDecode(credentialResponse.credential)
          handleLoginUsingGoogle(details.email);
         }}
         onError={() => {
         console.log("googleError")
         navigate('/', { replace: true });
         }}
         />
         <div className='register-button'>Don't have an Account ?<Button disableRipple onClick={() => navigate('/registration')}>Register here</Button></div>
        </form>
    </div>
    {showErrorModal && (
        <ErrorModal
          Error={errorMessage}
          handleShow={showErrorModal}
          handleHide={() => setShowErrorModal(false)}
        />
      )}
    </>
}