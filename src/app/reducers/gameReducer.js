import Puzzle from '../utils/puzzle.js';
import { RESET_BOARD, MOVE_TILE, UNDO_MOVE, NEW_GAME } from '../actions/gameActions';


function newPuzzle(puzzle) {
    return {
        puzzle,
        isSolved: false,
        moves: [],
        originalPuzzle: puzzle
    }
}

export default (state = newPuzzle(null), action) => {
    switch (action.type) {
        case NEW_GAME:
            return newPuzzle(new Puzzle(action.size));

        case RESET_BOARD:
            if (!state.puzzle || state.isSolved)
                return state;

            return {
                puzzle: state.originalPuzzle,
                isSolved: false,
                moves: [],
                originalPuzzle: state.originalPuzzle
            }

        case MOVE_TILE:
            if (!state.puzzle || state.isSolved)
                return state;

            const move=action.move;
            const puzzle = state.puzzle.executeMove(move.from, move.to);
            return {
                puzzle,
                isSolved: puzzle.isSolved(),
                moves: [...state.moves, move],
                originalPuzzle: state.originalPuzzle
            }

        case UNDO_MOVE:
            if (!state.puzzle || state.isSolved || state.moves.length == 0)
                return state;

            const moves = state.moves.slice(0);
            const {from, to} = moves.pop();
            return {
                puzzle: state.puzzle.executeMove(to, from),
                isSolved: false,
                moves,
                originalPuzzle: state.originalPuzzle
            }

        default:
            return state;
    }
}