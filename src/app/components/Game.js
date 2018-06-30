import React from 'react';
import GridContainer from '../containers/GridContainer.js';
import ControlPanelContainer from '../containers/ControlPanelContainer';
import NewGameModalContainer from '../containers/NewGameModalContainer';
import SolvedMessageContainer from '../containers/SolvedMessageContainer';

const puzzleSize = { defaultSize: 4, minSize: 2, maxSize: 12 };

const Game = ({ isSolved }) => {
    return (
        <div align='center'>
            <h1> N-Puzzle </h1>
            <br />
            <GridContainer height={400} width={400} />
            <br />
            <ControlPanelContainer />
            <br />
            <br />
            <SolvedMessageContainer />
            <NewGameModalContainer {...puzzleSize} />
        </div>
    );
}

export default Game;

