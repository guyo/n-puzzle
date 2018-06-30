import { connect } from 'react-redux';
import { moveTile } from '../actions/gameActions';
import React from 'react';
import Grid from '../components/Grid.js';

const mapStateToProps = ({game: {puzzle}}, { width, height }) => {
    return { puzzle, width, height }
}


// this component maps puzzle from state into grid props as well as 
// translating onTileClick into moveTile action
const GridContainer = ({ puzzle, height, width, moveTile }) => {
    return (
        <Grid tiles={puzzle.board} columns={puzzle.size}
            height={height} width={width}
            onTileClicked={(tilePos) => {
                const to = puzzle.checkMove(tilePos);
                if (to>=0)
                    moveTile(tilePos, to);
            }}
              />
    );
}

export default connect(mapStateToProps, { moveTile })(GridContainer);