import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';


const SolvedModal = ({ show, onClose, onNewGame }) => {
    return (
        < Modal show={show} onHide={onClose} >
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
                <Button bsStyle='default' onClick={onNewGame}>Yes</Button>
                <Button bsStyle='default' onClick={onClose}>No</Button>
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