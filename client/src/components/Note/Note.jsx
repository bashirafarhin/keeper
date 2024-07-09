import React,{useState} from "react";
import { Button } from "@mui/material";
import ExpandNote from "./ExpandNote";
import axios from "axios";
import "./Note.css";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";

function Note(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const navigate = useNavigate()
  const config={headers: {'Content-Type': 'application/json'}};


    
  
  const handleDelete = async() => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/notes/${props.userId}/${props.noteIndex}`,config);
      props.updateNotes();
    } catch (error) {
      navigate('/home');
    }
  };

  const handleUpdatedNote = async() => {
    try {
      setIsEditable(false);
      const titleDiv = document.getElementsByClassName("note-title")[props.index].getElementsByTagName('h2')[0];
      const titleText = titleDiv.innerText;
      const contentDiv = document.getElementsByClassName("note-content")[props.index].getElementsByTagName('p')[0];
      const contentText = contentDiv.innerText;



      const data=JSON.stringify({
        noteIndex : props.noteIndex,
        title : titleText,
        content : contentText,
      });
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/notes/${props.userId}`,data, config);
      props.updateNotes();
    } catch (error) {
      navigate('/home');
    }
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