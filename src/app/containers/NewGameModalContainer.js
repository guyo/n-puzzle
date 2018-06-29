import NewGameModal from '../components/NewGameModal';
import { newGame, closeNewGameModal ,NEWGAMEMODAL_MODES } from '../actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = ({ newGameModal: { show, mode } }, ownProps) => {
    let canClose = false;
    let title = null;

    if (show) {
        if (mode == NEWGAMEMODAL_MODES.INIT) {
            canClose = false;
            title = "Welcome to N-Puzzle!"
        } else {
            canClose = true;
            title = "Start a new Game?"
        }
    }
    return {
        ...ownProps,
        show,
        canClose,
        title
    }
}

const MapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClose: () => { dispatch(closeNewGameModal()) },
        onSubmit: (size) => {
            dispatch(closeNewGameModal());
            dispatch(newGame(size));
        }
    }
}

export default connect(mapStateToProps, MapDispatchToProps)(NewGameModal);