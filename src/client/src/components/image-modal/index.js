import React from 'react';
import { Modal } from 'react-bootstrap';
import SwitchButton from '../switch-button';

const ImageModal = (props) => {
    return (<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <img src={props.image} className='w-100' alt='Car image' />
      </Modal.Body>
      <Modal.Footer>
        <SwitchButton onClick={props.previousImage}  title='Previous'/>
        <SwitchButton onClick={props.nextImage}  title='Next'/>
      </Modal.Footer>
    </Modal>)
}

export default ImageModal;