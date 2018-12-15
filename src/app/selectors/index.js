import * as FromGame from '../reducers/gameReducer';

export const anyMovesDone = (state) => FromGame.anyMovesDone(state.game);
export const isSolved = (state) => FromGame.isSolved(state.game);
export const getCheckMove = (state) => FromGame.getCheckMove(state.game);