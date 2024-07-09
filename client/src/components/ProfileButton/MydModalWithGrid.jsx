import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import backgroundImagesLink from './BackgroundImages';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";
// import backgroundImages from "../../../public/backgroundImages"

export function MydModalWithGrid(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const config={headers: {'Content-Type': 'application/json'}};
  const [backgroundImage, setBackgroundImage] = useState(backgroundImagesLink[2]);

  const getInitialbackgroundImage= async() => {
    let index=-1;
    try{
      const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/background/${props.userId}`,config);
      index=response.data.index;
    } catch(err) {
      navigate('/home');
    }
    if(index===-1){ index=2; }
    setBackgroundImage(backgroundImagesLink[index]);
  }  

  const handleBackgroundImage = async(index) => {
    try{
      const data=JSON.stringify({index : index});
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/notes/background/${props.userId}`,data,config);
    } catch(err) {
      navigate('/home');
    }
    setBackgroundImage(backgroundImagesLink[index]);
  };

  useEffect(() => {
    getInitialbackgroundImage(); // Call the function only once when component mounts
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${(`/backgroundImages/${backgroundImage}`)})`;
  }, [backgroundImage]);

  useEffect(() => {
    return () => {
      // Remove background image when the component unmounts or location changes
      document.body.style.backgroundImage = 'none';
    };
  }, [location]);

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