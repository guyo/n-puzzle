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

            const from = action.from;
            const to = action.to;
            const puzzle = state.puzzle.executeMove(from, to)
            return {
                puzzle,
                isSolved: puzzle.isSolved(),
                moves: [...state.moves, { from, to }],
                originalPuzzle: state.originalPuzzles
            }

        case UNDO_MOVE:
            if (!state.puzzle || state.isSolved || state.moves.length == 0)
                return state;

            const moves = state.moves.slice(0);
            const lastMove = moves.pop();
            return {
                puzzle: state.puzzle.executeMove(lastMove.to, lastMove.from),
                isSolved: false,
                moves,
                originalPuzzle: state.originalPuzzle
            }

        default:
            return state;
    }
}