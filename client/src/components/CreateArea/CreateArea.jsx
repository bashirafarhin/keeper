import { useContext, useState } from "react";
import { Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import "./CreateArea.css";
import { UserContext } from "../../context/UserContext"
import { addNote } from "../../service/api";
import { useParams } from "react-router-dom";

const CreateArea = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { id } = useParams();
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
    await addNote(note, id);
    setDetails((prevDetails) => ({
      ...prevDetails,
      notes : [...prevDetails.notes, note],
    }));
    setNote({
      title: "",
      content: "",
    });
  }

  const expand = () => {
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
