import { OPEN_NEWGAMEMODAL, CLOSE_NEWGAMEMODAL, NEWGAMEMODAL_MODES } from '../actions/actions';

const INIT_STATE = {
    show: true,
    mode: NEWGAMEMODAL_MODES.INIT,
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OPEN_NEWGAMEMODAL:
            return {
                show: true,
                mode: action.mode,
            }
        case CLOSE_NEWGAMEMODAL:
            return {
                show: false,
            }
        default:
            return state;
    }
}