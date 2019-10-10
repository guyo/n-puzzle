import * as game from '../reducers/gameReducer';

export const anyMovesDone = (state) => game.anyMovesDone(state.game);
export const isSolved = (state) => game.isSolved(state.game);
export const getCheckMove = (state) => game.getCheckMove(state.game);