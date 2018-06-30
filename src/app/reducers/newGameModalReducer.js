import { OPEN_NEW_GAME_MODAL, CLOSE_NEW_GAME_MODAL, INIT_NEW_GAME_MODAL } from '../actions/newGameModalActions';



function createState(show, initDone) {
    return { show, initDone };
}

export default (state = createState(true, false), action) => {
    switch (action.type) {
        case INIT_NEW_GAME_MODAL:
            return createState(true, false)


        case OPEN_NEW_GAME_MODAL:
            return createState(true, true)


        case CLOSE_NEW_GAME_MODAL:
            return createState(false, false)

        default:
            return state;
    }
}