import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

function ErrorModal(props) {

  return (
    <>
      <Modal
        size="sm"
        show={props.handleShow}
        onHide={props.handleHide}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header style={{ backgroundColor: '#E85E6C', color: 'white'}}>

          <Modal.Title id="example-modal-sizes-title-sm" style={{ margin: 'auto'}}>
            <ClearSharpIcon onClick={props.handleHide} sx={{ fontSize: 40 }}/>
          </Modal.Title>
          
        </Modal.Header>
        <Modal.Body style={{ margin: 'auto'}}>{props.Error}</Modal.Body>
        
      </Modal>
    </>
  );
}

export default ErrorModal;