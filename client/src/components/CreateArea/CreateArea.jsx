import React,{ useState } from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import "./CreateArea.css";
import { useNavigate } from "react-router-dom"

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const config={headers: {'Content-Type': 'application/json'}};
  const addNote= async(newNote) =>  {
    try {
      const data=JSON.stringify(newNote);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/notes/${props.userId}`,data,config);
      props.updateNotes();
    } catch (error) {
      // console.log('Error adding note on react side:', error);
      navigate('/home');
    }
  }


   function submitNote(event) {
    addNote(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

 

  
  function expand() {
    setExpanded(true);
  }

  return (
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
  );
}

export default CreateArea;
