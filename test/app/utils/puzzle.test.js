import Puzzle, { EMPTY_TILE } from '../../../src/app/utils/puzzle';

describe('Puzzle', () => {
    it('create a puzzle from a given array', () => {
        let b = [1, 2, 3, 4, 5, 6, 7, 8, EMPTY_TILE];
        let p = new Puzzle(3, b);
        expect(p.board).toEqual(b);
        expect(p.size).toBe(3);
    });

    it('create a random puzzle of size 3', () => {
        let p = new Puzzle(3);
        let board = p.board;
        expect(p.size).toBe(3);
        expect(board.length).toBe(9);
        expect(board).toContain(EMPTY_TILE);
        expect(board).toContain(1);
        expect(board).toContain(2);
        expect(board).toContain(3);
        expect(board).toContain(4);
        expect(board).toContain(5);
        expect(board).toContain(6);
        expect(board).toContain(7);
        expect(board).toContain(8);
    });

    it('should inidcate that puzzle is solved', () => {
        expect(new Puzzle(2, [1, 2, 3, EMPTY_TILE]).isSolved()).toBe(true);
        expect(new Puzzle(2, [EMPTY_TILE, 1, 2, 3]).isSolved()).toBe(false);
        expect(new Puzzle(2, [1, 3, 2, EMPTY_TILE]).isSolved()).toBe(false);
        expect(new Puzzle(2, [1, 2, 3, 4, 5, 6, 7, 8, EMPTY_TILE]).isSolved()).toBe(true);
        expect(new Puzzle(2, [1, 3, 2, 4, 5, 6, 7, 8, EMPTY_TILE]).isSolved()).toBe(false);
    });

    it('should checkMove properly', () => {
        // 0 1
        // 2 3
        expect(new Puzzle(2, [0, 1, 2, EMPTY_TILE]).checkMove(2)).toBe(3);
        expect(new Puzzle(2, [0, 1, 2, EMPTY_TILE]).checkMove(1)).toBe(3);
        expect(new Puzzle(2, [0, 1, 2, EMPTY_TILE]).checkMove(0)).toBe(-1);
        expect(new Puzzle(2, [EMPTY_TILE, 1, 2, 3]).checkMove(1)).toBe(0);
        expect(new Puzzle(2, [EMPTY_TILE, 1, 2, 3]).checkMove(2)).toBe(0);
        expect(new Puzzle(2, [EMPTY_TILE, 1, 2, 3]).checkMove(3)).toBe(-1);

        // 0 1 2
        // 3 4 5
        // 6 7 8 
        const emptyCenterPuzzle = new Puzzle(3, [0, 1, 2, 3, EMPTY_TILE, 5, 6, 7, 8, 9]);
        expect(emptyCenterPuzzle.checkMove(1)).toBe(4);
        expect(emptyCenterPuzzle.checkMove(3)).toBe(4);
        expect(emptyCenterPuzzle.checkMove(5)).toBe(4);
        expect(emptyCenterPuzzle.checkMove(7)).toBe(4);

        const noEmptyPuzzle = new Puzzle(3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(noEmptyPuzzle.checkMove(1)).toBe(-1);
        expect(noEmptyPuzzle.checkMove(3)).toBe(-1);
        expect(noEmptyPuzzle.checkMove(5)).toBe(-1);
        expect(noEmptyPuzzle.checkMove(7)).toBe(-1);
    });

    it('should execute exemovecuteMove', () => {
        let p1 = new Puzzle(2, [0, 1, 2, EMPTY_TILE]);
        let p2 = p1.executeMove(0, 3);

        expect(p2).not.toBe(p1);
        expect(p2.board).not.toBe(p1.board);
        expect(p2.board).toEqual([EMPTY_TILE, 1, 2, 0]);
        expect(p1.board).toEqual([0, 1, 2, EMPTY_TILE]);
    });

    it('calculate index based on row and columns', () => {
        let p = new Puzzle(2, [0, 1, 2, EMPTY_TILE]);
        expect(p.index(0, 0)).toBe(0);
        expect(p.index(0, 1)).toBe(1);
        expect(p.index(0, 2)).toBe(2);
        expect(p.index(0, 3)).toBe(3);
    });

});