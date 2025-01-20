import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Link to="/">
        <Button variant="contained">Go to home page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
