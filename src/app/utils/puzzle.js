
const EMPTY_TILE = null;

// puzzle is immutable
class Puzzle {
	constructor(size, board) {
		this.size = size;
		if (board === undefined)
			board = createSolvableBoard(size);

		this.board = board;
	}

	isSolved() {
		const board = this.board;
		for (var i = 0; i < board.length - 1; i++) {
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
	checkMove(pos) {
		const row = Math.floor(pos / this.size);
		const col = pos % this.size;
		var newPos;

		if (row > 0 && this.board[newPos = this.index(row - 1, col)] === EMPTY_TILE)
			return newPos;

		if (row < this.size - 1 && this.board[newPos = this.index(row + 1, col)] === EMPTY_TILE)
			return newPos;


		if (col > 0 && this.board[newPos = this.index(row, col - 1)] === EMPTY_TILE)
			return newPos;

		if (col < this.size - 1 && this.board[newPos = this.index(row, col + 1)] === EMPTY_TILE)
			return newPos;

		return -1;
	}

	index(row, col) {
		var i = row * this.size + col;
		return i;
	}

	/**
	 * as puzzle is immutabel creates a new Puzzle where the tile in 
	 * oldPos is replaced by the tile in newPos
	 */
	executeMove(from, to) {
		const oldBoard = this.board;
		const newBoard = oldBoard.slice(0);

		newBoard[to] = oldBoard[from];
		newBoard[from] = oldBoard[to];

		return new Puzzle(this.size, newBoard);
	}
}


function createSolvableBoard(edgeSize) {
	do {
		var board = createBoard(edgeSize * edgeSize);
	} while (!isSolvable(board, edgeSize))
	return board;
}


function isSolvable(board, size) {
	var inversions = 0;
	for (let i = 0; i < board.length; i++) {
		if (board[i] === EMPTY_TILE)
			continue;
		for (let j = i + 1; j < board.length; j++) {
			if (board[j] !== EMPTY_TILE && board[i] > board[j])
				inversions++;
		}

	}

	var parity = 0;
	if (size % 2 === 0) {
		// for even N the algorithm is more complex
		// find empty tile and check if its an even or odd row from the bottom
		for (var i = 0; i < board.length; i++)
			if (board[i] === EMPTY_TILE)
				break;

		// calculate row
		var row = Math.floor(i / size);
		parity = (row + 1) % 2;
	}


	return inversions % 2 === parity;
}


function createBoard(size) {
	var board = new Array(size).fill(0);
	board.forEach((e, i, arr) => { arr[i] = i });
	board[0] = EMPTY_TILE;

	var n = size;
	while (n > 1) {
		var r = random(n--);
		var tmp = board[r];
		board[r] = board[n];
		board[n] = tmp;
	}

	return board;
}

function random(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


module.exports = Puzzle;