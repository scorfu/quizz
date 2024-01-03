import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalRefreshCheckProps {
  show: boolean;
  onClose: () => void;
  onYes: () => void;
}

function ModalRefreshCheck({ show, onClose, onYes }: ModalRefreshCheckProps) {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You will lose your score!</Modal.Body>
        <Modal.Footer>
          <Button variant="dark btn-outline-secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="warning btn-outline-danger" onClick={onYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalRefreshCheck;