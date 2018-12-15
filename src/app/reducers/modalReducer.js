import { OPEN_NEW_GAME_MODAL, CLOSE_NEW_GAME_MODAL,
    CLOSE_SOLVED_MODAL } from '../actions/modalActions';
import { NEW_GAME } from '../actions/gameActions';


const INIT_STATE={
    showInit: true,
    showNewGame: false,
    canShowSolved: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

    case OPEN_NEW_GAME_MODAL:
        return {
            showInit: false,
            showNewGame: true,
            canShowSolved: state.canShowSolved,
        };

    case CLOSE_NEW_GAME_MODAL:
        return {
            showInit: false,
            showNewGame: false,
            canShowSolved: state.canShowSolved,
        };

    case CLOSE_SOLVED_MODAL:
        return {
            showInit: state.showInit,
            showNewGame: state.showNewGame,
            canShowSolved: false
        };

    case NEW_GAME: {
        // new game is the same action which closes the newGameModal,
        // preventing duplicate dispatch. Also newGame allows showing the
        // solved modal as well
        return {
            showInit: false,
            showNewGame: false,
            canShowSolved: true
        };
    }

    default:
        return state;
    }
};