import { useContext, useState } from "react";
import { Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "./CreateArea.css";
import { UserContext } from "../../context/UserContext"
import ErrorModal from "../ErrorModal/ErrorModal";
import axios from 'axios';
import Loader from "../Loader/Loader";

const CreateArea = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const { setDetails } = useContext(UserContext);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

   const submitNote = async(event) => {
    event.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('keeper-token');
    const configWithToken = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    };
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/addNote`, note, configWithToken);
      setDetails((prevDetails) => ({
        ...prevDetails,
        notes : [...prevDetails.notes, res.data.note],
      }));
      setNote({
        title: "",
        content: "",
      });
    } catch(error) {
      if (error.response && error.response.data) {
        setErrorMessage( error.response.data.message || "An error occurred during adding note." );
        setShowErrorModal(true);
      } else {
        setErrorMessage("Network error. Please check your connection.");
        setShowErrorModal(true);
      }
    } finally {
      setLoading(false);
    }
  }

  const expand = () => {
    setExpanded(true);
  }

  return (
    <>
    <div>
      <form className="create-note" >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoComplete="on"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
    {showErrorModal && (
      <ErrorModal
        Error={errorMessage}
        handleShow={showErrorModal}
        handleHide={() => setShowErrorModal(false)}
      />
    )}
    { loading && <Loader/> }
    </>
  );
}

export default CreateArea;
