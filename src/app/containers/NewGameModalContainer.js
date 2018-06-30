import NewGameModal from '../components/NewGameModal';
import { newGame } from '../actions/gameActions'
import { closeNewGameModal, initOpenNewGameModal } from '../actions/newGameModalActions';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ newGameModal }, ownProps) => {
    return {
        newGameModal,
        ownProps,
    }
}

class newGameModalContainer extends React.PureComponent {
    componentDidMount() { // make sure the modal pops up on launch
        if (this.props.initDone)
            this.props.dispatch(initOpenNewGameModal());
    }

    render() {
        const { show, initDone } = this.props.newGameModal;
        let canClose;
        let title;
        if (initDone) {
            canClose = true;
            title = "Start a new Game?"
        } else {
            canClose = false;
            title = "Welcome to N-Puzzle!"
        }
        const dispatch = this.props.dispatch;

        return <NewGameModal {...this.props.ownProps}
            show={show} title={title} canClose={canClose}
            onClose={() => { dispatch(closeNewGameModal()) }}
            onSubmit={(size) => {
                dispatch(closeNewGameModal());
                dispatch(newGame(size))
            }}
        />
    }
}

export default connect(mapStateToProps)(newGameModalContainer);