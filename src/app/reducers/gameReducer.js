import Puzzle from '../utils/puzzle.js';
import { RESET_BOARD, MOVE_TILE, UNDO_MOVE, NEW_GAME } from '../actions/gameActions';
import { createSelector } from 'reselect';

function newPuzzle(size, board) {
    return {
        board,
        size,
        moves: [],
        originalBoard: board
    };
}

// private selectors, used by reducer and public selectors
export const getPuzzle = createSelector((state) => state.size, (size) => new Puzzle(size));
export const anyMovesDone = (state) => state.moves.length > 0;
export const isSolved = createSelector(
    [getPuzzle, (state) => state.board],
    (puzzle, board) => (board?puzzle.isSolved(board):false)
);
const getBoard = (state) => state.board;
export const getCheckMove = createSelector(
    [getPuzzle, getBoard],
    (puzzle, board) => (pos) => puzzle.checkMove(board,pos)
);

export default (state = newPuzzle(1, null), action) => {
    switch (action.type) {
    case NEW_GAME:
        return newPuzzle(action.size, new Puzzle(action.size).createBoard());

    case RESET_BOARD: {
        if (!state.board || isSolved(state) || !anyMovesDone(state))
            return state;

        return {
            ...state,
            board: state.originalBoard,
            moves: []
        };
    }

    case MOVE_TILE: {
        if (!state.board || isSolved(state))
            return state;

        const move = action.move;
        const board = getPuzzle(state).executeMove(state.board, move.from, move.to);

        return {
            ...state,
            board,
            moves: [ ...state.moves, move ],
        };
    }

    case UNDO_MOVE: {
        if (!state.board || isSolved(state) || !anyMovesDone(state))
            return state;

        const moves = state.moves.slice(0);
        const { from, to } = moves.pop();

        return {
            ...state,
            board: getPuzzle(state).executeMove(state.board,to, from),
            moves,
        };
    }

    default:
        return state;
    }
};