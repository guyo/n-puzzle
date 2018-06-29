import { connect } from 'react-redux';
import { resetBoard, undoMove, openNewGameModal, NEWGAMEMODAL_MODES } from '../actions/actions';
import ControlPanel from '../components/ControlPanel';

const mapStateToProps = ({ game: { isSolved, moves } }, ownProps) => {
    const anyMovesDone = moves.length > 0;
    return {
        canReset: !isSolved && anyMovesDone,
        canUndo: !isSolved && anyMovesDone,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onReset: () => dispatch(resetBoard()),
        onUndo: () => dispatch(undoMove()),
        onNewGame: () => dispatch(openNewGameModal(NEWGAMEMODAL_MODES.USER)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlPanel)