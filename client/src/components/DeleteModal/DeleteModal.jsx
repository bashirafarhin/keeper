import { Button, Modal } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import "./DeleteModal.css"

const DeleteModal = (props) => {
  return (
    <Modal
      show={props.handleShow}
      onHide={props.handleHide}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: '#E85E6C', color: 'white'}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{ margin: 'auto'}}>
        <DeleteIcon onClick={props.handleHide} sx={{ fontSize: 40 }}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: 'auto'}}>
        <h5>Are you sure you want to delete?</h5>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-evenly'}}>
        <Button className="custom-button-green" onClick={props.handleHide}>No, cancel</Button>
        <Button className="custom-button-red" onClick={props.yesConfirmation}>Yes, I'm sure</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;