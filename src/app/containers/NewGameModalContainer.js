import NewGameModal from '../components/NewGameModal';
import { newGame } from '../actions/gameActions';
import { closeNewGameModal } from '../actions/modalActions';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ modal: { showInit, showNewGame }}, ownProps) => {
    return { showInit, showNewGame, ownProps };
};

const NewGameModalContainer = ({ showInit, showNewGame, ownProps, dispatch }) => {

    let canClose = true;
    let title = '';
    let show = false;

    if (showInit) {
        show = true;
        canClose = false;
        title = 'Welcome to N-Puzzle!';
    } else if (showNewGame) {
        show = true;
        canClose = true;
        title = 'Start a new game?';
    }

    return (
        <NewGameModal {...ownProps}
            show={show} title={title} canClose={canClose}
            onClose={() => { dispatch(closeNewGameModal()); }}
            onSubmit={(size) => {
                dispatch(newGame(size));
            }}
        />
    );
};


export default connect(mapStateToProps)(NewGameModalContainer);