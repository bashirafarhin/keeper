import { Button, Modal } from 'react-bootstrap'

const MyVerticallyCenteredModal = (props) => {
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
         From Developer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{color: "#898585" , fontFamily : "Playwrite FR Moderne"}}>Keeper App</h4>
        <p style={{fontFamily : "Playwrite DE Grund"}}>
        Welcome to our secure notepad application. This app allows you to create, update, delete, and save your most important notes with ease. Your data is protected with robust security measures, ensuring your notes are safe from any theft. Explore the features of our app and enjoy a seamless, secure note-taking experience. Happy note-taking!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default MyVerticallyCenteredModal;