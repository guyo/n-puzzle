import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo , faPowerOff, faFastBackward } from '@fortawesome/free-solid-svg-icons';


// eslint-disable-next-line react/display-name
const ControlButton = React.memo(
    // eslint-disable-next-line no-unused-vars
    function ControlButton({ id, label, icon, enabled = 'true', handler, style = 'secondary' }) {
        return (
            <Button size='lg' variant={style} disabled={!enabled} id={id} onClick={handler} className='ml-1'>
                {label}
                <FontAwesomeIcon icon={icon} className='ml-2' />
            </Button>
        );
    });

const ControlPanel = ({ canUndo, onUndo, canReset, onReset, onNewGame }) => {
    return (
        <ButtonToolbar>
            <ControlButton id='undo' label='Undo' icon={faUndo} enabled={canUndo} handler={onUndo} />
            <ControlButton id='reset' label='Reset' icon={faFastBackward} enabled={canReset} handler={onReset} />
            <ControlButton id='newgame' label='New Game' icon={faPowerOff} handler={onNewGame} style='primary' />
        </ButtonToolbar>
    );
};

ControlPanel.propTypes = {
    canUndo: PropTypes.bool.isRequired,
    canReset: PropTypes.bool.isRequired,
    onUndo: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onNewGame: PropTypes.func.isRequired
};

export default ControlPanel;
