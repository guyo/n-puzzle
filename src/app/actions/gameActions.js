
export const RESET_BOARD = 'RESET_BOARD';
export const MOVE_TILE = 'MOVE_TILE';
export const UNDO_MOVE = 'UNDO_MOVE';
export const NEW_GAME = 'NEW GAME';

export const moveTile = function (from, to) {
    return {
        type: MOVE_TILE,
        move: { from, to }
    };
};

export const undoMove = function () {
    return {
        type: UNDO_MOVE
    };
};

export const resetBoard = function () {
    return { type: RESET_BOARD };
};

export const newGame = function (size) {
    return {
        type: NEW_GAME,
        size
    };
};
