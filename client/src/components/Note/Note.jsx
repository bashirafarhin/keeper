import {useContext, useState} from "react";
import { Button } from "@mui/material";
import ExpandNote from "./ExpandNote";
import "./Note.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { UserContext } from "../../context/UserContext";
import ErrorModal from "../ErrorModal/ErrorModal";
import axios from 'axios';

const Note = (props) => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { setDetails }=useContext(UserContext);
    
  const handleDelete = async() => {
    const token = localStorage.getItem('token');
    const configWithToken = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    };
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/deleteNote/${props.index}`, configWithToken);
      console.log(res);
      setDetails((prevDetails) => ({
        ...prevDetails,
        notes: prevDetails.notes.filter((_,i) => i !== props.index),
      }));
    } catch(err) {
      console.log(err," delete note");
    }
  };

  const handleUpdatedNote = async() => {
    const token = localStorage.getItem('token');
    const configWithToken = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    };
      setIsEditable(false);
      const titleDiv = document.getElementsByClassName("note-title")[props.index].getElementsByTagName('h2')[0];
      const titleText = titleDiv.innerText;
      const contentDiv = document.getElementsByClassName("note-content")[props.index].getElementsByTagName('p')[0];
      const contentText = contentDiv.innerText;
      try {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/updateNote/${props.index}`,{
          title : titleText,
          content : contentText,
        }, configWithToken);

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
      } catch(error) {
        console.log(error,"err updating note");
        if (error.response && error.response.data) {
          setErrorMessage( error.response.data.message || "An error occurred." );
          setShowErrorModal(true);
        } else {
          setErrorMessage("Network error. Please check your connection.");
          setShowErrorModal(true);
        }
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
  {showErrorModal && (
        <ErrorModal
          Error={errorMessage}
          handleShow={showErrorModal}
          handleHide={() => setShowErrorModal(false)}
        />
      )}
 </>
}

export default Note;