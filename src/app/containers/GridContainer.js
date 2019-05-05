import { connect } from 'react-redux';
import { moveTile } from '../actions/gameActions';
import React, { useRef, useLayoutEffect ,useCallback } from 'react';
import Grid from '../components/Grid.js';
import { getCheckMove } from '../selectors';

const mapStateToProps = (state) => {
    const { board, size } = state.game;
    return { board, size, checkMove: getCheckMove(state) };
};

// count on conncet to auto bind the action creator to dispatch
const mapDispatchToProps = { moveTile };

// custom hook for creating a static callback , so grid is not rerendered on every render
function useEventCallback(callback) {
    const callbackRef=useRef();
    // using layoutEffect as for some reason enzyme doesnt activate useEffect on updates
    useLayoutEffect(() => {
        callbackRef.current=callback;
    },[callback]);

    return useCallback((...args) => (0,callbackRef.current)(...args), [callbackRef]);
}

// create an onTileClicked action which check for move validity
// and fires a moveTile action with the right property when it is
const GridContainer = ({ board, size, height, width, checkMove, moveTile }) => (
    <Grid tiles={board} columns={size}
        height={height} width={width}
        onTileClicked={useEventCallback((tilePos) => {
            const to = checkMove(tilePos);
            if (to >= 0) // only execute valid moves
                moveTile(tilePos, to);
        })}
    />
);

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
