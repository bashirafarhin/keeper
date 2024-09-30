import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import ErrorModal from '../ErrorModal/ErrorModal';
import { UserLogin, authUsingGoogle, checkAuth } from '../../service/api';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const isAuth = async () => {
            const response = await checkAuth();
            if (response && response.data.authenticated) {
                navigate(`/home/${response.data.id}`);
            }
        };
      isAuth();
    }, [navigate]);

    const [login, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    
    const handleChange= (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setLoginDetails((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
    }

    const handleLogin = async (event) => {
      event.preventDefault();
      let response=await UserLogin(login);
      if(response && response.data && response.data.success){
        const id=response.data.id;
        navigate(`/home/${id}`);
      } else {
        let message = response==null ? "Error occurred!. Please try again later" : response.data.message;
        setErrorMessage(message);
        setShowErrorModal(true);
      }
      setLoginDetails({
        email: "",
        password: "",
      });
    };


    const handleLoginUsingGoogle = async (email) => {
      let response = await authUsingGoogle(email);
      if(!response){
        setErrorMessage("Try other Login methods.");
        setShowErrorModal(true);
      } else {
        const id=response.data.id;
        navigate(`/home/${id}`);
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
         console.log("googleError");
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

export default LoginForm;