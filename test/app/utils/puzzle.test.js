import Puzzle, { EMPTY_TILE } from '../../../src/app/utils/puzzle';

describe('Puzzle', () => {

    afterEach(() => {
        if (window.__GLOBAL_FUNCTION_HOOKS__.hasOwnProperty('shuffle'))
            delete window.__GLOBAL_FUNCTION_HOOKS__['shuffle'];
    });

    it('create a puzzle of size 1', () => {
        expect(new Puzzle(1).createBoard()).toEqual([EMPTY_TILE]);
    });

    it('create a puzzle of size 3', () => {
        const puzzle = new Puzzle(3);
        const board = puzzle.createBoard();
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
        const puzzle2=new Puzzle(2);
        expect(puzzle2.isSolved([1, 2, 3, EMPTY_TILE])).toBe(true);

        expect(puzzle2.isSolved([EMPTY_TILE, 1, 2, 3])).toBe(false);
        expect(puzzle2.isSolved([1, 3, 2, EMPTY_TILE])).toBe(false);

        const puzzle3=new Puzzle(3);
        expect(puzzle3.isSolved([1, 2, 3, 4, 5, 6, 7, 8, EMPTY_TILE])).toBe(true);
        expect(puzzle3.isSolved([1, 3, 2, 4, 5, 6, 7, 8, EMPTY_TILE])).toBe(false);
    });

    it('should checkMove properly', () => {
        // 0 1
        // 2 3
        const puzzle2=new Puzzle(2);
        expect(puzzle2.checkMove([0, 1, 2, EMPTY_TILE],2)).toBe(3);
        expect(puzzle2.checkMove([0, 1, 2, EMPTY_TILE],1)).toBe(3);
        expect(puzzle2.checkMove([0, 1, 2, EMPTY_TILE],0)).toBe(-1);
        expect(puzzle2.checkMove([EMPTY_TILE, 1, 2, 3],1)).toBe(0);
        expect(puzzle2.checkMove([EMPTY_TILE, 1, 2, 3],2)).toBe(0);
        expect(puzzle2.checkMove([EMPTY_TILE, 1, 2, 3],3)).toBe(-1);

        // 0 1 2
        // 3 4 5
        // 6 7 8 
        const puzzle3=new Puzzle(3);
        const emptyCenterBoard = [0, 1, 2, 3, EMPTY_TILE, 5, 6, 7, 8, 9];
        expect(puzzle3.checkMove(emptyCenterBoard,1)).toBe(4);
        expect(puzzle3.checkMove(emptyCenterBoard,3)).toBe(4);
        expect(puzzle3.checkMove(emptyCenterBoard,5)).toBe(4);
        expect(puzzle3.checkMove(emptyCenterBoard,7)).toBe(4);

        const noEmptyBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(puzzle3.checkMove(noEmptyBoard,1)).toBe(-1);
        expect(puzzle3.checkMove(noEmptyBoard,3)).toBe(-1);
        expect(puzzle3.checkMove(noEmptyBoard,5)).toBe(-1);
        expect(puzzle3.checkMove(noEmptyBoard,7)).toBe(-1);
    });

    it('should execute executeMove', () => {
        const puzzle=new Puzzle(2);
        const b1 = [0, 1, 2, EMPTY_TILE];
        const b2 = puzzle.executeMove(b1, 0, 3);

        expect(b2).not.toBe(b1);
        expect(b2).toEqual([EMPTY_TILE, 1, 2, 0]);
        expect(b1).toEqual([0, 1, 2, EMPTY_TILE]);
    });

    it('calculate index based on row and columns', () => {
        const p = new Puzzle(2);
        expect(p.index(0, 0)).toBe(0);
        expect(p.index(0, 1)).toBe(1);
        expect(p.index(0, 2)).toBe(2);
        expect(p.index(0, 3)).toBe(3);
    });

    it('should not create a solved puzzle', () => {
        const shuffle=jest.fn()
            .mockReturnValueOnce([1,2,3,null])
            .mockReturnValueOnce([1,2,3,null])
            .mockReturnValueOnce([1,2,null,3]);
        window.__GLOBAL_FUNCTION_HOOKS__.shuffle=shuffle;

        expect(new Puzzle(2).createBoard()).toEqual([1,2,null,3]);
        expect(shuffle).toHaveBeenCalledTimes(3);
    });

    it('should not create an unsolvable puzzle', () => {
        const shuffle=jest.fn()
            .mockReturnValueOnce([1,3,2,null])
            .mockReturnValueOnce([1,3,2,null])
            .mockReturnValueOnce([1,2,null,3]);
        window.__GLOBAL_FUNCTION_HOOKS__.shuffle=shuffle;

        expect(new Puzzle(2).createBoard()).toEqual([1,2,null,3]);
        expect(shuffle).toHaveBeenCalledTimes(3);
    });
});
