import React from 'react';
import HighlightIcon from '@mui/icons-material/Highlight';
import "./Header.css";
const BasicMenu = React.lazy(() => import('../ProfileButton/ProfileButton'));

const Header = () => {
  return (
   
    <div className="header">
      <div className='header-logo'><h1><HighlightIcon fontSize='50px'/>Keeper</h1></div>
      <div className='profile-button-div'><BasicMenu/></div>
    </div>
    
  );
}

export default Header;