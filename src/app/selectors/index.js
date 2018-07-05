import * as FromGame from '../reducers/gameReducer';

export const anyMovesDone = (state) => FromGame.anyMovesDone(state.game);
export const isSolved = (state) => FromGame.isSolved(state.game);
export const getPuzzle = (state) => FromGame.getPuzzle(state.game);
