import { useEffect, useContext } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import backgroundImagesLink from './BackgroundImages';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { changeBackgroundImage } from '../../service/api';

const MydModalWithGrid = (props) => {
  const { id }=useParams();
  const { details : { backgroundImageIndex }, setDetails } = useContext(UserContext);

  const handleBackgroundImage = async(index) => {
    await changeBackgroundImage(index,id);
    setDetails((prevDetails) => ({
      ...prevDetails,
      backgroundImageIndex : index
    }));
  };

  useEffect(() => {
    let img=backgroundImagesLink[backgroundImageIndex];
    document.body.style.backgroundImage = `url(${(`/backgroundImages/${img}`)})`;
  }, [backgroundImageIndex]);

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