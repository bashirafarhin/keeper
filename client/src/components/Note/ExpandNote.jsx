import { Button, Modal } from 'react-bootstrap';

const ExpandNote = (props) => {
  return (
    <div>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontFamily : "Playwrite DE Grund"}}>
         My Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
      
 
        <h4 style={{color: "#898585" , fontFamily : "Playwrite FR Moderne" ,whiteSpace : "pre-wrap" ,wordWrap : "break-word"}}>{props.title}</h4>
        <p style={{fontFamily : "Playwrite DE Grund",whiteSpace : "pre-wrap" ,wordWrap : "break-word"}}>
        {props.content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default ExpandNote;