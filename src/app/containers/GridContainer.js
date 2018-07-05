import { connect } from 'react-redux';
import { moveTile } from '../actions/gameActions';
import React from 'react';
import Grid from '../components/Grid.js';
import { getPuzzle } from '../selectors';

const mapStateToProps = (state, { width, height }) => {
    return { puzzle: getPuzzle(state) , width, height };
};

// this component maps puzzle logic into the Grid component:
// 1) it map from state into grid props including handling a null puzzle. 
// 2) it create an onTileClicked action which check for move validity
//    and fires a moveTile action with the right property when it is
const GridContainer = ({ puzzle, height, width, moveTile }) => {
    var tiles = [null]; 
    var columns = 1;
    if (puzzle) {
        tiles = puzzle.board;
        columns = puzzle.size;
    }

    return (
        <Grid tiles={tiles} columns={columns}
            height={height} width={width}
            onTileClicked={(tilePos) => {
                const to = puzzle.checkMove(tilePos);
                if (to >= 0) // only execute valid moves
                    moveTile(tilePos, to);
            }}
        />
    );
};

export default connect(mapStateToProps, { moveTile })(GridContainer);