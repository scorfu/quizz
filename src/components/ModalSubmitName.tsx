import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAppSelector } from '../app/hooks';
import { fetchData } from '../utils/fetch';
import { useRef } from 'react';

interface EndGameProps {
  show: boolean;
  onClose: () => void;
  onYes: () => void;
  lastGameScore: number;
}

function ModalSubmitName({ show, onClose, onYes, lastGameScore }: EndGameProps) {
  const totalScore = useAppSelector(state => state.leaderboard.totalScore);
  const nameRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const playerName = nameRef.current?.value;
    const nameAndScore = {
      player: playerName,
      score: totalScore
    }
    console.log(nameRef.current?.value);
    fetchData('post', nameAndScore);
    setTimeout(() => {
      onYes()
    }, 500);
  }
  
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header className='bg-light' closeButton>
        <Modal.Title>Congrats on your 10 games!</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-light'>
      <div>Your last games score is: {lastGameScore}</div>
      <div>Your total score is: {totalScore}</div>
        <input type='text' placeholder='Insert your name' ref={nameRef} className='bg-body-secondary text-danger-emphasis'></input>
        </Modal.Body>
      <Modal.Footer className='bg-dark-subtle'>
        <Button variant="dark btn-outline-secondary" onClick={onClose}>
          Cancel (Refresh Page)
        </Button>
        <Button variant="warning btn-outline-danger" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSubmitName;