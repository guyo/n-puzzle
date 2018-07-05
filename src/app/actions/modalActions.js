export const OPEN_INIT_MODAL = 'OPEN_INIT_MODAL';
export const OPEN_NEW_GAME_MODAL = 'OPEN_NEW_GAME_MODAL';
export const CLOSE_NEW_GAME_MODAL = 'CLOSE_NEW_GAME_MODAL';
export const CLOSE_SOLVED_MODAL = 'CLOSE_SOLVED_MODAL';


export function openNewGameModal() {
    return {
        type: OPEN_NEW_GAME_MODAL,
    };
}

export function openInitModal() {
    return {
        type: OPEN_INIT_MODAL,
    };
}

// closes both init and newGame modal
export function closeNewGameModal() {
    return {
        type: CLOSE_NEW_GAME_MODAL
    };
}

export function closeSolvedModal() {
    return {
        type: CLOSE_SOLVED_MODAL
    };
}