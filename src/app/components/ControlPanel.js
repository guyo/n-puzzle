import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ControlButton = React.memo(
    function ControlButton({ id, label, glyph, enabled = 'true', handler, style = 'default' }) {
        return (
            <Button bsSize='large' bsStyle={style} disabled={!enabled} id={id}
                onClick={handler} style={{ marginLeft: '5px' }}>
                <Glyphicon glyph={glyph} /> {label}
            </Button>
        );
    });

const ControlPanel = ({ canUndo, onUndo, canReset, onReset, onNewGame }) => {
    return (
        <React.StrictMode>
            <div align='center'>
                <ControlButton id='undo' label='Undo' glyph='repeat' enabled={canUndo} handler={onUndo} />
                <ControlButton id='reset' label='Reset' glyph='fast-backward' enabled={canReset} handler={onReset} />
                <ControlButton id='newgame' label='New Game' glyph='play' handler={onNewGame} style='primary' />
            </div>
        </React.StrictMode>
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