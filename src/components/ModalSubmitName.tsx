import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchData } from '../utils/fetch';
import { useRef } from 'react';

interface EndGameProps {
  show: boolean;
  onClose: () => void;
  onYes: () => void;
  lastGameScore: number;
}

function ModalSubmitName({ show, onClose, onYes, lastGameScore }: EndGameProps) {
  // const lastGameScore: number = lastGameScore;
  const totalScore = useAppSelector(state => state.leaderboard.totalScore);
  const nameRef = useRef<HTMLInputElement>(null);
  // console.log("games Played:", lastGameScore);

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
    }, 2000);
    // onYes();
  }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Congrats on your 10 games!</Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
      <div>Your last games score is: {lastGameScore}</div>
      <div>Your total score is: {totalScore}</div>
        <input type='text' placeholder='Insert your name' ref={nameRef}></input>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="dark btn-outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="warning btn-outline-danger" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSubmitName;