import { useContext } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import backgroundImagesLink from './BackgroundImages';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { changeBackgroundImage } from '../../service/api';

const MydModalWithGrid = (props) => {
  const { id }=useParams();
  const { setDetails } = useContext(UserContext);

  const handleBackgroundImage = async(index) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      backgroundImageIndex : index
    }));
    await changeBackgroundImage(index,id);
  };


  return (
    <Modal size="lg" show={props.Show2} onHide={props.onSHide2} aria-labelledby="contained-modal-title-vcenter example-modal-sizes-title-lg">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Background Patterns
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
     
        <Container className='p-0 container'>
        <div className="grid-container">
      {backgroundImagesLink.map((imgLink, index) => (
        <div key={index} className="grid-item" style={{backgroundImage : `url(${(`/backgroundImages/${imgLink}`)})`}} onClick={()=>handleBackgroundImage(index)}>
        </div>
      ))}
    </div>
        </Container>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide2}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MydModalWithGrid;