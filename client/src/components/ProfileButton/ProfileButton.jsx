import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./ProfileButton.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { MydModalWithGrid } from './MydModalWithGrid';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { googleLogout } from '@react-oauth/google';
import DeleteModal from "../DeleteModal/DeleteModal"
export default function BasicMenu(props) {
  const navigate= useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClickAboutApp = () => {
    setAnchorEl(null);
    setModalShow(true);
  };

  const handleBackgroundImage = () => {
    setAnchorEl(null);
    setModalShow2(true);
  };

  const config={headers: {'Content-Type': 'application/json'}};
  const handleClickLogout = async() => {
    setAnchorEl(null);
    googleLogout();
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`,config);
    navigate('/', { replace: true });
  }

  const handleClickDeleteAccount = () => {
    setAnchorEl(null);
    setShowModalDeleteAccount(true);
  };

  const handleConfirmDeleteAccount = async() => {
    setShowModalDeleteAccount(false);
    try{
      const data=JSON.stringify({ id : props.userId});
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/deleteAccount`,data,config);
      navigate('/', { replace: true });
    } catch {
      navigate('/home', { replace: true });
    }
  }

  
  return (
    
    <div>
      <Button
        className='profile-button'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
            backgroundColor : "var(--white)",
        }}
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleBackgroundImage}>Change background</MenuItem>
        
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
        <MenuItem onClick={handleClickDeleteAccount}>Delete Account</MenuItem>
        <MenuItem onClick={handleClickAboutApp}>About App</MenuItem>
      </Menu>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MydModalWithGrid
          Show2={modalShow2}  
          onHide2={() => setModalShow2(false)}
          userId={props.userId}
        />
      <DeleteModal
      handleShow={showModalDeleteAccount}
      handleHide={() => setShowModalDeleteAccount(false) }
      yesConfirmation={ () => handleConfirmDeleteAccount() }
      />
    </div>
  );
}
