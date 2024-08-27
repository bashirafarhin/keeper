import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import "./ProfileButton.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import MydModalWithGrid from './MydModalWithGrid';
import { useNavigate, useParams } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import DeleteModal from "../DeleteModal/DeleteModal"
import { userAccountDelete, userLogout } from '../../service/api';


const BasicMenu = () => {
  const navigate= useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const { id } =useParams();
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

  const handleClickLogout = async() => {
    document.body.style.backgroundImage = "none";
    setAnchorEl(null);
    await userLogout();
    googleLogout();
    navigate('/', { replace: true });
  }

  const handleClickDeleteAccount = () => {
    setAnchorEl(null);
    setShowModalDeleteAccount(true);
  };

  const handleConfirmDeleteAccount = async() => {
    document.body.style.backgroundImage = "none";
    setShowModalDeleteAccount(false);
    let response = await userAccountDelete(id);
    if(!response){
      navigate(`/home/${id}`, { replace: true });
    } else {
      navigate('/', { replace: true });
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
        />
      <DeleteModal
      handleShow={showModalDeleteAccount}
      handleHide={() => setShowModalDeleteAccount(false) }
      yesConfirmation={ () => handleConfirmDeleteAccount() }
      />
    </div>
  );
}

export default BasicMenu;