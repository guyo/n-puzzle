import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const NewGameModal = (props) => {
    const [inputVal, setInputVal] = useState(props.defaultSize);
    const sizeNum = +inputVal; //change input value into a number
    const valid = sizeNum >= props.minSize && sizeNum <= props.maxSize;
    const onSubmit = () => valid && props.onSubmit(sizeNum);

    // focus manually due to a bug in react-bootstrap 1.0 where autoFocus property doesn't work
    const inputRef = useRef(null);
    useLayoutEffect(() => {
        if (props.show)
            inputRef.current.focus();
    }, [props.show]);

    return (
        <Modal show={props.show} onHide={props.onClose}
            backdrop={props.canClose ? true : 'static'} id='newGameModal'>
            <Modal.Header closeButton={props.canClose}>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => { e.preventDefault(), onSubmit(); }} >
                    <Form.Group>
                        <Form.Label>Choose Puzzle Size:</Form.Label>
                        <Form.Control type='text' isInvalid={!valid} autoFocus={true} ref={inputRef}
                            value={inputVal} onChange={e => setInputVal(e.target.value)} />
                        <Form.Control.Feedback type='invalid'>
                            {'Enter a number between 3 and 12'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {props.canClose &&
                    <Button variant='outline-secondary' onClick={props.onClose}
                        id='newgamecancel'>{'Cancel'}</Button>
                }
                <Button variant='primary' onClick={onSubmit}
                    disabled={!valid} id='newgamestart'>Start Game !</Button>
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

