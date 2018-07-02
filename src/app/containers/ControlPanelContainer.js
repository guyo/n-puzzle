import { connect } from 'react-redux';
import { resetBoard, undoMove } from '../actions/gameActions';
import { openNewGameModal } from '../actions/newGameModalActions'
import ControlPanel from '../components/ControlPanel';
import { isSolved , anyMovesDone } from '../selectors'

const mapStateToProps = (state) => {
    console.log(anyMovesDone(state));

    const movesDone = anyMovesDone(state);
    const solved = isSolved(state);
    return {
        canReset: !solved && movesDone,
        canUndo: !solved && movesDone,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(resetBoard()),
        onUndo: () => dispatch(undoMove()),
        onNewGame: () => dispatch(openNewGameModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)