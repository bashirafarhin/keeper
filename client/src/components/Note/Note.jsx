import {useContext, useState} from "react";
import { Button } from "@mui/material";
import ExpandNote from "./ExpandNote";
import "./Note.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { UserContext } from "../../context/UserContext";
import ErrorModal from "../ErrorModal/ErrorModal";
import axios from 'axios';
import Loader from "../Loader/Loader";

const Note = (props) => {
  const [ note, setNote ] = useState({
    title : props.title,
    content : props.content,
  })
  const [ loading, setLoading ] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isDisable, setIsDisable] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { setDetails }=useContext(UserContext);
    
  const handleDelete = async() => {
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
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/deleteNote/${props.id}`, configWithToken);
      setDetails((prevDetails) => ({
        ...prevDetails,
        notes: prevDetails.notes.filter((note) => note._id !== props.id), // Use noteId to filter
      }));
    } catch(err) {
      setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatedNote = async() => {
    setLoading(true);
    const token = localStorage.getItem('keeper-token');
    const configWithToken = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    };
      setIsDisable(true);
      try {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/updateNote/${props.id}`, note, configWithToken);
        setDetails((prevDetails) => {
          const updatedNotes = [...prevDetails.notes];
          const noteIndex = updatedNotes.findIndex((note) => note._id === props.id);
            updatedNotes[noteIndex] = {
              ...updatedNotes[noteIndex],
              title: note.title,
              content: note.content,
            };
          return { ...prevDetails, notes: updatedNotes };
        });
      } catch(err) {
        setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
        setShowErrorModal(true);
        //if error show restore the original title and context
        setNote({
          title : props.title,
          content : props.content,
        })
      } finally {
        setLoading(false);
      }
}

 return <>
  <div className="note-box">
    <input
    disabled={isDisable}
    className={`note-title ${isDisable ? "disabled" : "editable"}`}
    value={note.title}
    onChange={(e) => setNote((prevNote) => ({ ...prevNote, title: e.target.value }))}
    />
    <div className="horizontal-line"></div>
    <textarea
    disabled={isDisable}
    className={`note-content ${isDisable ? "disabled" : "editable"}`}
    value={note.content}
    onChange={(e) => setNote((prevNote) => ({ ...prevNote, content: e.target.value }))}
    />
    <div className="horizontal-line"></div>
    <div className="note-button">
    <Button variant="contained" className="note-option-button" onClick={ () => setDeleteModalShow(true)}>Delete</Button>
      { !isDisable? <Button variant="contained" className="note-option-button" color="success" onClick={handleUpdatedNote}>Save</Button> :
      <Button variant="contained" className="note-option-button" onClick={ () => setIsDisable(false)} >Edit</Button> }
      <Button variant="contained" className="note-option-button" onClick={ () => setModalShow(true)}>Expand</Button>
      <ExpandNote title={props.title} content={props.content} show={modalShow} onHide={() => setModalShow(false)} />      
    </div>
  </div>
  <DeleteModal
    heading="Are you sure you want to delete?"
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
  { loading && <Loader/> }
 </>
}

export default Note;