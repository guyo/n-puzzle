import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Modal, Button, FormGroup, FormControl,
    ControlLabel, HelpBlock
} from 'react-bootstrap';

const NewGameModal = (props) => {

    const [state, setState] = useState({ size: props.defaultSize });

    function handleChange(e) {
        setState({ size: e.target.value });
    }

    function handleClose() {
        props.onClose();
    }

    const canClose = props.canClose;
    const sizeNum = +state.size;
    const valid = sizeNum >= props.minSize && sizeNum <= props.maxSize;
    const onSubmit = () => valid && props.onSubmit(sizeNum);

    return (
        <Modal show={props.show} onHide={handleClose}
            backdrop={canClose ? true : 'static'} id='newGameModal'>
            <Modal.Header closeButton={canClose}>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => { e.preventDefault(), onSubmit(); }} >
                    <FormGroup validationState={valid ? null : 'error'}>
                        <ControlLabel>Choose Puzzle Size:</ControlLabel>
                        <FormControl type='text' value={state.size} onChange={handleChange} autoFocus={true} />
                        <FormControl.Feedback />
                        {!valid && <HelpBlock>Enter a number between 3 and 12</HelpBlock>}
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle='success' onClick={onSubmit}
                    disabled={!valid} id='newgamestart'>Start Game !</Button>

                {canClose && <Button onClick={handleClose} id='newgamecancel'>{'Cancel'}</Button>}
            </Modal.Footer>
        </Modal>
    );
};

NewGameModal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    canClose: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    defaultSize: PropTypes.number,
    minSize: PropTypes.number,
    maxSize: PropTypes.number
};

NewGameModal.defaultProps = {
    minSize: 3,
    maxSize: 10,
    defaultSize: 4
};

export default NewGameModal;

