import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const ControlButton = React.memo(
    // eslint-disable-next-line no-unused-vars
    function ControlButton({ id, label, glyph, enabled = 'true', handler, style = 'outline-secondary' }) {
        return (
            <Button size='lg' variant={style} disabled={!enabled} id={id}
                onClick={handler} style={{ marginLeft: '5px' }}>
                {label}
            </Button>
        );
    });

const ControlPanel = ({ canUndo, onUndo, canReset, onReset, onNewGame }) => {
    return (
        <div align='center'>
            <ControlButton id='undo' label='Undo' glyph='repeat' enabled={canUndo} handler={onUndo} />
            <ControlButton id='reset' label='Reset' glyph='fast-backward' enabled={canReset} handler={onReset} />
            <ControlButton id='newgame' label='New Game' glyph='play' handler={onNewGame} style='primary' />
        </div>
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
