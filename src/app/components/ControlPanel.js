import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ControlButton({ label, glyph, enabled = 'true', handler, style = 'default' }) {
    return (
        <Button bsSize='large' bsStyle={style} disabled={!enabled} onClick={handler} style={{ marginLeft: '5px' }}>
            <Glyphicon glyph={glyph} /> {label}
        </Button>
    );
}

const ControlPanel = ({ show, canUndo, onUndo, canReset, onReset, onNewGame }) => {
    return (
        <div align='center'>
            <ControlButton label='Undo' glyph='repeat' enabled={canUndo} handler={onUndo} />
            <ControlButton label='Reset' glyph='fast-backward' enabled={canReset} handler={onReset} />
            <ControlButton label='New Game' glyph='play' handler={onNewGame} style='primary' />
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


