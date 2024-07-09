import HighlightIcon from '@mui/icons-material/Highlight';
import "./Header.css";
import BasicMenu from '../ProfileButton/ProfileButton';

function Header(props) {
  return (
   
    <div className="header">
      <div className='header-logo'><h1><HighlightIcon fontSize='large'/>Keeper</h1></div>
      <div className='profile-button-div'><BasicMenu userId={props.userId}/></div>
    </div>
    
  );
}

export default Header;