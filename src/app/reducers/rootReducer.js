import game from './gameReducer';
import modal from './modalReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    game,
    modal
});