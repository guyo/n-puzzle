import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

const NewGameModal = (props) => {
    const [inputVal, setInputVal] = useState(props.defaultSize);
    const sizeNum = +inputVal; //change input value into a number
    const valid = sizeNum >= props.minSize && sizeNum <= props.maxSize;
    const onSubmit = () => valid && props.onSubmit(sizeNum);

    return (
        <Modal show={props.show} onHide={props.onClose}
            backdrop={props.canClose ? true : 'static'} id='newGameModal'>
            <Modal.Header closeButton={props.canClose}>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => { e.preventDefault(), onSubmit(); }} >
                    <FormGroup validationState={valid ? null : 'error'}>
                        <ControlLabel>Choose Puzzle Size:</ControlLabel>
                        <FormControl type='text' autoFocus={true}
                            value={inputVal} onChange={e => setInputVal(e.target.value)}/>
                        <FormControl.Feedback />
                        {!valid && <HelpBlock>Enter a number between 3 and 12</HelpBlock>}
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle='success' onClick={onSubmit}
                    disabled={!valid} id='newgamestart'>Start Game !</Button>

                {props.canClose && <Button onClick={props.onClose} id='newgamecancel'>{'Cancel'}</Button>}
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

