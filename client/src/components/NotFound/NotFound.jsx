import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return <>
    <div>Not Found</div>
    <Button>
        <h2>Go to the <Link to="/">Login</Link></h2>
    </Button>
    </>
}

export default NotFound;