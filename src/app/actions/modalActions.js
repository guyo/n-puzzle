export const OPEN_NEW_GAME_MODAL = 'OPEN_NEW_GAME_MODAL';
export const CLOSE_NEW_GAME_MODAL = 'CLOSE_NEW_GAME_MODAL';
export const CLOSE_SOLVED_MODAL = 'CLOSE_SOLVED_MODAL';

export const openNewGameModal = function () {
    return {
        type: OPEN_NEW_GAME_MODAL
    };
};

export const closeNewGameModal = function () {
    return {
        type: CLOSE_NEW_GAME_MODAL
    };
};

export const closeSolvedModal = function () {
    return {
        type: CLOSE_SOLVED_MODAL
    };
};
