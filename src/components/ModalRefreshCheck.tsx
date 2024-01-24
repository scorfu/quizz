import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalRefreshCheckProps {
  show: boolean;
  onClose: () => void;
  onYes: () => void;
}

function ModalRefreshCheck({ show, onClose, onYes }: ModalRefreshCheckProps) {

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className='bg-light'>
        <Modal.Title >Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-light'>You will lose your score!</Modal.Body>
      <Modal.Footer className='bg-dark-subtle'>
        <Button variant="dark btn-outline-secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="warning btn-outline-danger" onClick={onYes}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRefreshCheck;