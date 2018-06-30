import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class NewGameModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = { size: this.props.defaultSize };
    }

    handleChange(e) {
        this.setState({ size: e.target.value })
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        const sizeNum = +this.state.size;
        const valid = sizeNum >= this.props.minSize && sizeNum <= this.props.maxSize;

        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton={this.props.canClose}>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup validationState={valid ? null : 'error'}>
                            <ControlLabel>Choose Puzzle Size:</ControlLabel>
                            <FormControl type='text' value={this.state.size} onChange={this.handleChange} />
                            <FormControl.Feedback />
                            {!valid && <HelpBlock>Enter a number between 3 and 12</HelpBlock>}
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle='success' onClick={() => this.props.onSubmit(sizeNum)}
                        disabled={!valid}>Start Game !</Button>

                    {this.props.canClose && <Button onClick={this.handleClose}>Don't Start</Button>}
                </Modal.Footer>
            </Modal>
        )
    }
}

NewGameModal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    canClose: PropTypes.bool.isRequired,
    defaultSize: PropTypes.number,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    minSize: PropTypes.number,
    maxSize: PropTypes.number,
}

NewGameModal.defaultProps = {
    minSize: 3,
    maxSize: 10,
    onSubmit: () => { console.warn('onSubmit is undefined') },
    onClose: () => { console.warn('onClose is undefined') },
    defaultSize: 4
}

