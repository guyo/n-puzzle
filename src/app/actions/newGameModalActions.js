export const INIT_NEW_GAME_MODAL = 'INIT_NEW_GAME_MODAL';
export const OPEN_NEW_GAME_MODAL = 'OPEN_NEW_GAME_MODAL';
export const CLOSE_NEW_GAME_MODAL = 'CLOSE_NEW_GAME_MODAL';


export function openNewGameModal() {
    return {
        type: OPEN_NEW_GAME_MODAL,
    }
}

export function initOpenNewGameModal() {
    return {
        type: INIT_NEW_GAME_MODAL,
    }
}

export function closeNewGameModal() {
    return {
        type: CLOSE_NEW_GAME_MODAL
    }
}