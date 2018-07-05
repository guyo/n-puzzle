import reducer, { anyMovesDone, isSolved } from '../../../src/app/reducers/gameReducer';
import Puzzle, { EMPTY_TILE } from '../../../src/app/utils/puzzle';
import * as Action from '../../../src/app/actions/gameActions';

const PUZZLE1 = new Puzzle(3, [1, 2, 3, 4, 5, 6, 7, EMPTY_TILE, 8]);
const INITAL_STATE = {
    originalPuzzle: null,
    moves: [],
    puzzle: null
};

describe(' Game Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITAL_STATE);
    });

    it('should handle MOVE_TILE', () => {
        expect(reducer({
            originalPuzzle: PUZZLE1,
            moves: [],
            puzzle: PUZZLE1
        }, Action.moveTile(6, 7))).toEqual({
            originalPuzzle: PUZZLE1,
            moves: [{ from: 6, to: 7 }],
            puzzle: new Puzzle(3, [1, 2, 3, 4, 5, 6, EMPTY_TILE, 7, 8])
        });

        expect(reducer({
            originalPuzzle: PUZZLE1,
            moves: [{ from: 6, to: 7 }],
            puzzle: new Puzzle(3, [1, 2, 3, 4, 5, 6, EMPTY_TILE, 7, 8])
        }
            , Action.moveTile(3, 6))).toEqual({
                originalPuzzle: PUZZLE1,
                moves: [{ from: 6, to: 7 }, { from: 3, to: 6 }],
                puzzle: new Puzzle(3, [1, 2, 3, EMPTY_TILE, 5, 6, 4, 7, 8])
            });

        expect(reducer(undefined, Action.moveTile(6, 7))).toEqual(INITAL_STATE);
    });

    it('should handle NEW_GAME', () => {
        let newState = reducer(undefined, Action.newGame(2));
        expect(newState.moves).toEqual([]);
        expect(newState.puzzle).toEqual(newState.originalPuzzle);
        expect(newState.puzzle.size).toBe(2);
        expect(newState.puzzle.board.sort()).toEqual([1, 2, 3, EMPTY_TILE]);


        newState = reducer({
            puzzle: new Puzzle(3, [1, 2, 3, EMPTY_TILE, 5, 6, 4, 7, 8]),
            moves: [{ from: 6, to: 7 }, { from: 3, to: 6 }],
            originalPuzzle: PUZZLE1
        }, Action.newGame(1));
        expect(newState.moves).toEqual([]);
        expect(newState.originalPuzzle).toEqual(new Puzzle(1));
        expect(newState.puzzle).toEqual(newState.originalPuzzle);
    });

    it('should handle UNDO', () => {
        expect(reducer(undefined, Action.undoMove)).toEqual(INITAL_STATE);

        const puzzle = new Puzzle(2, [1, 3, 2, EMPTY_TILE]);
        const currentState = {
            originalPuzzle: puzzle,
            puzzle: puzzle,
            moves: []
        };
        expect(reducer(currentState, Action.undoMove())).toEqual(currentState);

        currentState.moves = [{ from: 3, to: 2 }];
        expect(reducer(currentState, Action.undoMove())).toEqual({
            originalPuzzle: puzzle,
            puzzle: new Puzzle(2, [1, 3, EMPTY_TILE, 2]),
            moves: []
        });

        currentState.moves = [{ from: 0, to: 2 }, { from: 3, to: 2 }];
        expect(reducer(currentState, Action.undoMove())).toEqual({
            originalPuzzle: puzzle,
            puzzle: new Puzzle(2, [1, 3, EMPTY_TILE, 2]),
            moves: [{ from: 0, to: 2 }]
        });

    });

    it('should handle RESET', () => {
        expect(reducer(undefined, Action.resetBoard())).toEqual(INITAL_STATE);

        // 1 3
        // 2 null
        const originalPuzzle = new Puzzle(2, [1, 3, 2, EMPTY_TILE]);
        const currentState = {
            originalPuzzle,
            puzzle: originalPuzzle,
            moves: []
        };
        expect(reducer(currentState, Action.resetBoard())).toEqual(currentState);


        currentState.moves = [{ from: 2, to: 3 }, { from: 0, to: 2 }];
        currentState.puzzle = new Puzzle(2, [EMPTY_TILE, 3, 1, 2]);

        expect(reducer(currentState, Action.resetBoard())).toEqual({
            originalPuzzle,
            moves: [],
            puzzle: originalPuzzle
        });
    });
});

describe('isSolved selector', () => {
    it('should return false on unsolved puzzle', () => {
        expect(isSolved({
            puzzle: new Puzzle(2, [1, 2, EMPTY_TILE, 3])
        })).toBe(false);
    });

    it('should return true on solved puzzle', () => {
        expect(isSolved({
            puzzle: new Puzzle(2, [1, 2, 3, EMPTY_TILE])
        })).toBe(true);
    });

    it('should return false on uninitialized array', () => {
        expect(isSolved(reducer(undefined, {}))).toBe(false);
    });

    it('should not invoke isSolved() when state has not changed', () => {
        let puzzle=new Puzzle(2,[1,EMPTY_TILE,3,null]);
        const mockIsSolved=jest.fn();
        puzzle.isSolved=mockIsSolved;
        isSolved({puzzle});
        isSolved({puzzle}); // call twice      
        expect(mockIsSolved.mock.calls.length).toBe(1);

        // call with a new equiavlent puzzle instance should increase the count
        puzzle=new Puzzle(2,[1,EMPTY_TILE,3,null]);
        puzzle.isSolved=mockIsSolved;
        isSolved({puzzle});
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
