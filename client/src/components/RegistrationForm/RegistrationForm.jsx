import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import "./RegistrationForm.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import ErrorModal from '../ErrorModal/ErrorModal';

export default function RegistrationForm() {

    const navigate = useNavigate();
    const [showRegisterErrorModal, setRegisterShowErrorModal] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');

    const config={headers: {'Content-Type': 'application/json'}};
    const [register, setRegistrationDetails] = useState({
        email: "",
        password: "",
    });
    
    const handleChange= (event) => {
        const { name, value } = event.target;
        setRegistrationDetails((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        event.preventDefault();
    }

    const handleRegistration= async(event) => {
        if(register.password.length<6){
          setRegisterErrorMessage("Password must exceed 6 characters!");
          setRegisterShowErrorModal(true);
        }
        else {
        try{
          const data=JSON.stringify(register);
          const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`,data,config);
          if(response.data.id==="userRegistered"){
            setRegisterErrorMessage("You're registered.Try Login");
            setRegisterShowErrorModal(true);
          }
          else {
            navigate(`/home/${response.data.id}`);
          }
        } catch(err) {
          navigate('/registration', { replace: true });
        }
        setRegistrationDetails({
          email : "",
          password : "",
        });
        event.preventDefault();
      }
    }

    const handleRegistrationUsingGoogle = async(email) => {
      try{
        const data=JSON.stringify({ email : email});
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/register/google`,data,config);
        navigate(`/home/${response.data.id}`);
      } catch(err) {
        navigate('/registration');
      }
    }

  



    const buttonStyles = {
        backgroundColor : '#3B71CA',
        display: 'block',
        height: '9%',
        width: '90%',
        borderRadius: 7,
        fontWeight: "bold",
        '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    '&:active': {
      outline: 'none',
      boxShadow: 'none',
    }
      };



    return <>
    <div className='registration-container'>
        <div className='registration-page-logo'>Keeper</div>
        <form className='registration-form'>
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
         <Button style={buttonStyles} variant="contained"  onClick={handleRegistration}>Register</Button>
         <div className='registration-or-option'><strong>OR</strong></div>
         <GoogleLogin
          onSuccess={credentialResponse => {
          const details=jwtDecode(credentialResponse.credential)
          handleRegistrationUsingGoogle(details.email);
         }}
         onError={() => {
         navigate('/registration')
         }}
         />
         <div className='login-button'>Already Registered ?<Button disableRipple onClick={() => navigate('/')}>login here</Button></div>
        </form>
        {showRegisterErrorModal && (
        <ErrorModal
          Error={registerErrorMessage}
          handleShow={showRegisterErrorModal}
          handleHide={() => setRegisterShowErrorModal(false)}
        />
      )}
    </div>
    </>
}