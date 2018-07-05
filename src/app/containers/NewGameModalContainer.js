import NewGameModal from '../components/NewGameModal';
import { newGame } from '../actions/gameActions';
import { closeNewGameModal, openInitModal } from '../actions/modalActions';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ modal }, ownProps) => {
    return {
        modal,
        ownProps,
    };
};

class newGameModalContainer extends React.PureComponent {
    componentDidMount() { // make sure the modal pops up on launch
        this.props.dispatch(openInitModal());
    }

    render() {
        const { showInit, showNewGame } = this.props.modal;
        let canClose=true;
        let title='';
        let show=false;

        if (showInit) {
            show=true;
            canClose = true;
            title = 'Start a new Game?';
        } else if(showNewGame) {
            show=true;
            canClose = false;
            title = 'Welcome to N-Puzzle!';
        }
        const dispatch = this.props.dispatch;

        return <NewGameModal {...this.props.ownProps}
            show={show} title={title} canClose={canClose}
            onClose={() => { dispatch(closeNewGameModal()); }}
            onSubmit={(size) => {
                dispatch(newGame(size));
            }}
        />;
    }
}

export default connect(mapStateToProps)(newGameModalContainer);