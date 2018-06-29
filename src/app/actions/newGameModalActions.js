export const OPEN_NEWGAMEMODAL = 'OPEN_NEWGAMEMODAL';
export const CLOSE_NEWGAMEMODAL = 'CLOSE_NEWGAMEMODAL';
export const NEWGAMEMODAL_MODES = {
    INIT: 'NEWGAMEMODAL_MODE_INIT',
    USER: 'NEWGAMEMODAL_MODE_USER'
};

export function userOpenNewGameModal() {
    return {
        type: OPEN_NEWGAMEMODAL,
        mode: NEWGAMEMODAL_MODES.USER
    }
}

export function initOpenNewGameModal() {
    return {
        type: OPEN_NEWGAMEMODAL,
        mode: NEWGAMEMODAL_MODES.INIT
    }
}

export function closeNewGameModal() {
    return {
        type: CLOSE_NEWGAMEMODAL
    }
}