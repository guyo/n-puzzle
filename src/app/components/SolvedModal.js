import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';


const SolvedModal = ({ show, onClose, onNewGame }) => {
    return (
        <Modal show={show} onHide={onClose} id='solvedModal' >
            <Modal.Header closeButton>
                <Modal.Title>
                    Puzzle Solved
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Congratulations you have successfully finished the puzzle!!!
                <br />
                <br />
                Start a new game?
                <br />
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle='default' id='solvedstart' onClick={onNewGame} autoFocus={true}>Yes</Button>
                <Button bsStyle='default' id='solvedcancel' onClick={onClose}>No</Button>
            </Modal.Footer>
        </Modal >
    );
};

SolvedModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onNewGame: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default SolvedModal;