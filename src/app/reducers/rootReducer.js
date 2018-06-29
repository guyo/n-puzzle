import game from './gameReducer';
import newGameModal from './newGameModalReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    game,
    newGameModal
});