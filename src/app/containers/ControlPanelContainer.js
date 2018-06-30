import { connect } from 'react-redux';
import { resetBoard, undoMove } from '../actions/gameActions';
import { userOpenNewGameModal } from '../actions/newGameModalActions'
import ControlPanel from '../components/ControlPanel';

const mapStateToProps = ({ game: { isSolved, moves } }) => {
    const anyMovesDone = moves.length > 0;
    return {
        canReset: !isSolved && anyMovesDone,
        canUndo: !isSolved && anyMovesDone,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(resetBoard()),
        onUndo: () => dispatch(undoMove()),
        onNewGame: () => dispatch(userOpenNewGameModal()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlPanel)