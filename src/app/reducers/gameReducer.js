import Puzzle from '../utils/puzzle.js';
import { RESET_BOARD, MOVE_TILE, UNDO_MOVE, NEW_GAME } from '../actions/gameActions';
import { createSelector } from 'reselect';

function newPuzzle(puzzle) {
    return {
        puzzle,
        moves: [],
        originalPuzzle: puzzle
    };
}

// private selectors, used by reducer and public selectors
export const getPuzzle = (state) => state.puzzle;
export const anyMovesDone = (state) => state.moves.length > 0;
export const isSolved = createSelector(getPuzzle,
    (puzzle) => (puzzle?puzzle.isSolved():false));

export default (state = newPuzzle(null), action) => {
    switch (action.type) {
    case NEW_GAME:
        return newPuzzle(new Puzzle(action.size));

    case RESET_BOARD: {
        if (!state.puzzle || isSolved(state) || !anyMovesDone(state))
            return state;

        return {
            puzzle: state.originalPuzzle,
            moves: [],
            originalPuzzle: state.originalPuzzle
        };
    }

    case MOVE_TILE: {
        if (!state.puzzle || isSolved(state))
            return state;

        const move = action.move;
        const puzzle = state.puzzle.executeMove(move.from, move.to);

        return {
            puzzle,
            moves: [ ...state.moves, move ],
            originalPuzzle: state.originalPuzzle
        };
    }

    case UNDO_MOVE: {
        if (!state.puzzle || isSolved(state) || !anyMovesDone(state))
            return state;

        const moves = state.moves.slice(0);
        const { from, to } = moves.pop();

        return {
            puzzle: state.puzzle.executeMove(to, from),
            moves,
            originalPuzzle: state.originalPuzzle
        };
    }

    default:
        return state;
    }
};