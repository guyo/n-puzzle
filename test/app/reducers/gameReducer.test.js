import reducer, { anyMovesDone, isSolved, getPuzzle, getCheckMove } from '../../../src/app/reducers/gameReducer';
import { EMPTY_TILE } from '../../../src/app/utils/puzzle';
import * as Action from '../../../src/app/actions/gameActions';

const BOARD1 = [1, 2, 3, 4, 5, 6, 7, EMPTY_TILE, 8];
const INITAL_STATE = {
    originalBoard: [EMPTY_TILE],
    moves: [],
    size: 1,
    board: [EMPTY_TILE]
};

describe(' Game Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITAL_STATE);
    });

    it('should handle MOVE_TILE', () => {
        expect(reducer({
            originalBoard: BOARD1,
            size: 3,
            moves: [],
            board: BOARD1
        }, Action.moveTile(6, 7))).toEqual({
            originalBoard: BOARD1,
            moves: [{ from: 6, to: 7 }],
            size: 3,
            board: [1, 2, 3, 4, 5, 6, EMPTY_TILE, 7, 8]
        });

        expect(reducer({
            originalBoard: BOARD1,
            moves: [{ from: 6, to: 7 }],
            board: [1, 2, 3, 4, 5, 6, EMPTY_TILE, 7, 8]
        }
            , Action.moveTile(3, 6))).toEqual({
            originalBoard: BOARD1,
            moves: [{ from: 6, to: 7 }, { from: 3, to: 6 }],
            board: [1, 2, 3, EMPTY_TILE, 5, 6, 4, 7, 8]
        });

        expect(reducer(undefined, Action.moveTile(6, 7))).toEqual(INITAL_STATE);
    });

    it('should handle NEW_GAME', () => {
        let newState = reducer(undefined, Action.newGame(2));
        expect(newState.moves).toEqual([]);
        expect(newState.size).toBe(2);
        expect(newState.board.sort()).toEqual([1, 2, 3, EMPTY_TILE]);
        expect(newState.originalBoard).toEqual(newState.board);

        newState = reducer({
            board: [1, 2, 3, EMPTY_TILE, 5, 6, 4, 7, 8],
            moves: [{ from: 6, to: 7 }, { from: 3, to: 6 }],
            size: 3,
            originalBoard: BOARD1
        }, Action.newGame(1));
        expect(newState.moves).toEqual([]);
        expect(newState.originalBoard).toEqual([null]);
        expect(newState.board).toEqual(newState.originalBoard);
    });

    it('should handle UNDO', () => {
        expect(reducer(undefined, Action.undoMove)).toEqual(INITAL_STATE);

        const board = [1, 3, 2, EMPTY_TILE];
        const currentState = {
            originalBoard: board,
            board,
            size: 2,
            moves: []
        };
        expect(reducer(currentState, Action.undoMove())).toEqual(currentState);

        currentState.moves = [{ from: 3, to: 2 }];
        expect(reducer(currentState, Action.undoMove())).toEqual({
            originalBoard: board,
            board: [1, 3, EMPTY_TILE, 2],
            size: 2,
            moves: []
        });

        currentState.moves = [{ from: 0, to: 2 }, { from: 3, to: 2 }];
        expect(reducer(currentState, Action.undoMove())).toEqual({
            originalBoard: board,
            board: [1, 3, EMPTY_TILE, 2],
            size: 2,
            moves: [{ from: 0, to: 2 }]
        });

    });

    it('should handle RESET', () => {
        expect(reducer(undefined, Action.resetBoard())).toEqual(INITAL_STATE);

        // 1 3
        // 2 null
        const originalBoard = [1, 3, 2, EMPTY_TILE];
        const currentState = {
            originalBoard,
            board: originalBoard,
            size:2,
            moves: []
        };
        expect(reducer(currentState, Action.resetBoard())).toEqual(currentState);


        currentState.moves = [{ from: 2, to: 3 }, { from: 0, to: 2 }];
        currentState.board = [EMPTY_TILE, 3, 1, 2];

        expect(reducer(currentState, Action.resetBoard())).toEqual({
            originalBoard,
            moves: [],
            size:2,
            board: originalBoard
        });
    });
});

describe('isSolved selector', () => {
    it('should return false on unsolved puzzle', () => {
        expect(isSolved({
            board: [1, 2, EMPTY_TILE, 3],
            size: 2
        })).toBe(false);
    });

    it('should return true on solved puzzle', () => {
        expect(isSolved({
            board: [1, 2, 3, EMPTY_TILE],
            size:2
        })).toBe(true);
    });

    it('should return valid boolean on inital state (before new game)', () => {
        expect(typeof isSolved(reducer(undefined, {}))).toBe('boolean');
    });

    it('should not invoke isSolved() when state has not changed', () => {
        const state={
            board: [1,EMPTY_TILE,3,null],
            size: 2
        };

        const mockIsSolved=jest.fn();
        getPuzzle(state).isSolved=mockIsSolved;
        isSolved(state);
        isSolved(state); // call twice      
        expect(mockIsSolved.mock.calls.length).toBe(1);

        // call with a new equiavlent puzzle instance should increase the count
        const state2={
            board: [1,EMPTY_TILE,3,null],
            size: 2
        };
        getPuzzle(state2).isSolved=mockIsSolved;
        isSolved(state2);
        expect(mockIsSolved.mock.calls.length).toBe(2);
    });
});

describe('any moves done selector', () => {
    it('should return false on uninitalized state', () => {
        expect(anyMovesDone(reducer(undefined, {}))).toBe(false);
    });

    it('should return false on new game', () => {
        expect(anyMovesDone(reducer(undefined, Action.newGame(2)))).toBe(false);
    });

    it('should return true on a game with moves', () => {
        const state = reducer(reducer(undefined, Action.newGame(2)), Action.moveTile(0, 1));
        expect(anyMovesDone(state));
    });
});


describe('getCheckMove', () => {
    it('should return a function', () => {
        expect(getCheckMove({size:2, board:[1,2,3,null]})).toBeInstanceOf(Function);
    });

    it('should return a function that properly tests moves a board of 2x2', () => {
        expect(getCheckMove({size:2, board:[1,2,3,null]})(0)).toBe(-1);
        expect(getCheckMove({size:2, board:[1,2,3,null]})(2)).toBe(3);
        expect(getCheckMove({size:2, board:[1,2,3,null]})(1)).toBe(3);
    });

    it('should return a function that properly tests moves a board of 3x3', () => {
        // 012
        // 345
        // 678 
        expect(getCheckMove({size:3, board:[1,2,3,4,null,5,6,7,8]})(1)).toBe(4);
        expect(getCheckMove({size:3, board:[1,2,3,4,null,5,6,7,8]})(3)).toBe(4);
        expect(getCheckMove({size:3, board:[1,2,3,4,null,5,6,7,8]})(7)).toBe(4);
        expect(getCheckMove({size:3, board:[1,2,3,4,null,5,6,7,8]})(0)).toBe(-1);
        expect(getCheckMove({size:3, board:[1,2,3,4,null,5,6,7,8]})(2)).toBe(-1);
        expect(getCheckMove({size:3, board:[1,2,3,4,null,5,6,7,8]})(6)).toBe(-1);
        expect(getCheckMove({size:3, board:[1,2,3,4,null,5,6,7,8]})(8)).toBe(-1);
    });

    it('should return the same function when board and size dont change', () => {
        const board=[1,2,3,null];
        expect(getCheckMove({size:2, board })).toBe(getCheckMove({size:2, board}));
    });

    it('should return the a d function when board is not the same or size changes', () => {
        expect(getCheckMove({size:2, board:[1,2,3,null]})).not.toBe(
            getCheckMove({size:2, board:[1,3,2,null]}));

        const board=[1,2,3,null];
        expect(getCheckMove({size:2, board})).not.toBe(
            getCheckMove({size:3, board}));
    });
});

describe('getPuzzle selector', () => {
    it('should return the same object when size dont change', () => {
        expect(getPuzzle({size:1, board:null})).toBe(getPuzzle({size:1,board:[null]}));
    });

    it('should return a puzzle with the proper size' , () => {
        expect(getPuzzle({size:2}).size).toBe(2);
        expect(getPuzzle({size:3}).size).toBe(3);
    });

    it('should return a valid puzzle on init , with size 1', () => {
        expect(getPuzzle(reducer(undefined,{})).size).toBe(1);
    });
});