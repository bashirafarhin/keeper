import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import "./ProfileButton.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import MydModalWithGrid from "./MydModalWithGrid";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import DeleteModal from "../DeleteModal/DeleteModal";
import axios from "axios";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const BasicMenu = () => {
  const navigate = useNavigate();
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

  const handleClickLogout = async () => {
    setAnchorEl(null);
    try {
      const token = localStorage.getItem("token");
      console.log(token, "above", typeof token);
      const configWithToken = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      console.log("hii");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        configWithToken
      );
      console.log("bye");
      console.log(res);
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err, " err during logout");
    }
  };

  const handleClickDeleteAccount = () => {
    setAnchorEl(null);
    setShowModalDeleteAccount(true);
  };

  const handleConfirmDeleteAccount = async () => {
    document.body.style.backgroundImage = "none";
    setShowModalDeleteAccount(false);
    try {
      const token = localStorage.getItem("token");
      console.log(token, "above", typeof token);
      const configWithToken = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/deleteAccount`,
        configWithToken
      );
      localStorage.removeItem("token");
      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err, "Error during deleting account");
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: "transparent",
          color: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <LightbulbIcon style={{ fontSize: '70px', color: 'white', borderRadius: '50%', padding: '10px' }} className="icon-button"/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
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
        handleHide={() => setShowModalDeleteAccount(false)}
        yesConfirmation={() => handleConfirmDeleteAccount()}
      />
    </div>
  );
};

export default BasicMenu;
