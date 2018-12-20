import functionHook from './functionHook';

export const EMPTY_TILE = null;

export default class Puzzle {
    constructor (size) {
        this.size = size;
    }

    isSolved (board) {
        for (let i = 0; i < board.length - 1; i++) {
            if (board[i] !== (i + 1))
                return false;
        }

        return board[board.length - 1] === EMPTY_TILE;
    }

    /**
	 * check if the tile as 'pos' can move to the empty tile. if so , returns
	 * the pos of the empty tile so they could be replaced.
	 * O/W returns -1.
	 */
    checkMove (board, pos) {
        const row = Math.floor(pos / this.size);
        const col = pos % this.size;
        let newPos;

        if (row > 0 && board[newPos = this.index(row - 1, col)] === EMPTY_TILE)
            return newPos;

        if (row < this.size - 1 && board[newPos = this.index(row + 1, col)] === EMPTY_TILE)
            return newPos;


        if (col > 0 && board[newPos = this.index(row, col - 1)] === EMPTY_TILE)
            return newPos;

        if (col < this.size - 1 && board[newPos = this.index(row, col + 1)] === EMPTY_TILE)
            return newPos;

        return -1;
    }

    index (row, col) {
        return row * this.size + col;
    }


    executeMove (board, from, to) {
        const newBoard = board.slice(0);
        newBoard[to] = board[from];
        newBoard[from] = board[to];
        return newBoard;
    }

    createBoard () {
        if (this.size<2)
            return [EMPTY_TILE];

        let board=range(1,this.size*this.size);
        board.push(EMPTY_TILE);
        board=shuffle(board);

        if (!this.isSolved(board) && this._isSolvable(board))
            return board;

        return this.createBoard();
    }

    _isSolvable (board) {
        let inversions = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === EMPTY_TILE)
                continue;

            for (let j = i + 1; j < board.length; j++) {
                if (board[j] !== EMPTY_TILE && board[i] > board[j])
                    inversions++;
            }
        }

        let parity = 0;
        if (this.size % 2 === 0) {
            // for even N the algorithm is more complex
            // find empty tile and check if its an even or odd row from the bottom
            let i;
            for (i = 0; i < board.length; i++)
                if (board[i] === EMPTY_TILE)
                    break;

            // calculate row
            const row = Math.floor(i / this.size);
            parity = (row + 1) % 2;
        }

        return inversions % 2 === parity;
    }

}

function yatesFisherShuffle(arr) {
    arr=arr.slice(0);
    const random=(max) => Math.floor(Math.random() * Math.floor(max));

    let n = arr.length;
    while (n > 1) {
        const r = random(n--);
        const tmp = arr[r];
        arr[r] = arr[n];
        arr[n] = tmp;
    }

    return arr;
}

const shuffle=functionHook(yatesFisherShuffle,'shuffle');

function range(start, end) {
    return [...Array(end-start).keys()].map(i => i + start);
}