import HighlightIcon from '@mui/icons-material/Highlight';
import "./Header.css";
import BasicMenu from '../ProfileButton/ProfileButton';

const Header = () => {
  return (
   
    <div className="header">
      <div className='header-logo'><h1><HighlightIcon fontSize='large'/>Keeper</h1></div>
      <div className='profile-button-div'><BasicMenu/></div>
    </div>
    
  );
}

export default Header;