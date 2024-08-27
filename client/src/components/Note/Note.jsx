import {useContext, useState} from "react";
import { Button } from "@mui/material";
import ExpandNote from "./ExpandNote";
import "./Note.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { UserContext } from "../../context/UserContext";
import { deleteNote, UpdateNote } from "../../service/api";
import { useParams } from "react-router-dom";

const Note = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { setDetails }=useContext(UserContext);
  const { id }=useParams();
    
  const handleDelete = async() => {
    const index=props.index;
    await deleteNote(index,id);
    setDetails((prevDetails) => ({
      ...prevDetails,
      notes: prevDetails.notes.filter((_, i) => i !== index),
    }));
  };

  const handleUpdatedNote = async() => {
      setIsEditable(false);
      const titleDiv = document.getElementsByClassName("note-title")[props.index].getElementsByTagName('h2')[0];
      const titleText = titleDiv.innerText;
      const contentDiv = document.getElementsByClassName("note-content")[props.index].getElementsByTagName('p')[0];
      const contentText = contentDiv.innerText;
      const data={
        noteIndex : props.noteIndex,
        title : titleText,
        content : contentText,
      };
      await UpdateNote(data,id);
      setDetails((prevDetails) => {
        const updatedNotes = [...prevDetails.notes];
        updatedNotes[props.index] = {
          ...updatedNotes[props.index],
          title: titleText,
          content: contentText,
        };
        return {
          ...prevDetails,
          notes: updatedNotes,
        };
      });
}

 return <>
  <div className="note-box">
    <div className="note-title" ><h2 className="single-line" contentEditable={isEditable} suppressContentEditableWarning={true}>{props.title}</h2></div>
    <div className="horizontal-line"></div>
    <div className="note-content" ><p className="note-content-p" contentEditable={isEditable} suppressContentEditableWarning={true}>{props.content}</p></div>
    <div className="horizontal-line"></div>
    <div className="note-button">
    <Button variant="contained" className="note-option-button" onClick={ () => setDeleteModalShow(true)}>Delete</Button>
      { isEditable? <Button variant="contained" className="note-option-button" color="success" onClick={handleUpdatedNote}>Save</Button> :
      <Button variant="contained" className="note-option-button" onClick={ () => setIsEditable(true)} >Edit</Button> }
      <Button variant="contained" className="note-option-button" onClick={ () => setModalShow(true)}>Expand</Button>
      <ExpandNote title={props.title} content={props.content} show={modalShow} onHide={() => setModalShow(false)} />      
    </div>
  </div>
  <DeleteModal
    handleShow={deleteModalShow}
    handleHide={ () => setDeleteModalShow(false) }
    yesConfirmation={ () => {setDeleteModalShow(false); handleDelete()} }
    />
 </>
}

export default Note;