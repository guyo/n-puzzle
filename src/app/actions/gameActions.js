
export const RESET_BOARD = "RESET_BOARD";
export const MOVE_TILE = 'MOVE_TILE';
export const UNDO_MOVE = 'UNDO_MOVE';
export const NEW_GAME = 'NEW GAME';

export function moveTile(tilePos) {
    return {
        type: MOVE_TILE,
        tilePos
    }
}

export function undoMove() {
    return {
        type: UNDO_MOVE
    }
}

export function resetBoard() {
    return { type: RESET_BOARD };
}

export function newGame(size) {
    return {
        type: NEW_GAME,
        size
    }
}


