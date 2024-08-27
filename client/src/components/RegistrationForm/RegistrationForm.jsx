import { useState } from 'react';
import Button from '@mui/material/Button';
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import ErrorModal from '../ErrorModal/ErrorModal';
import { authUsingGoogle, UserRegistration } from '../../service/api';

const RegistrationForm = () => {

    const navigate = useNavigate();
    const [showRegisterErrorModal, setRegisterShowErrorModal] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');
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
        event.preventDefault();
        if(register.password.length<6){
          setRegisterErrorMessage("Password must exceed 6 characters!");
          setRegisterShowErrorModal(true);
        }
        else {
       
          const response= await UserRegistration(register);
          if(response.data.success){
            const id=response.data.id
            navigate(`/home/${id}`);
          }
          else {
            setRegisterErrorMessage(response.data.message);
            setRegisterShowErrorModal(true);
          }
        setRegistrationDetails({
          email : "",
          password : "",
        });
        
      }
    }

    const handleRegistrationUsingGoogle = async(email) => {
        const response=await authUsingGoogle(email);
        if(!response){
        navigate('/');
        } else {
        const id=response.data.id;
        navigate(`/home/${id}`);
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

export default RegistrationForm;