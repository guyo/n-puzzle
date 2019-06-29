import React from 'react';
import GridContainer from '../containers/GridContainer.js';
import ControlPanelContainer from '../containers/ControlPanelContainer';
import NewGameModalContainer from '../containers/NewGameModalContainer';
import SolvedModalContainer from '../containers/SolvedModalContainer';
import { Container, Row } from 'react-bootstrap';

const puzzleSize = { defaultSize: 4, minSize: 2, maxSize: 12 };

const Game = () => {
    return (
        <Container fluid='true'>
            <React.StrictMode>
                <Row className="justify-content-md-center">
                    <h1> N-Puzzle </h1>
                </Row>
                <Row><br /></Row>
                <Row className="justify-content-md-center">
                    <GridContainer height={400} width={400} />
                </Row>
                <Row><br /></Row>
                <Row className="justify-content-md-center">
                    <ControlPanelContainer />
                </Row>
            </React.StrictMode>
            <SolvedModalContainer />
            <NewGameModalContainer {...puzzleSize} />
        </Container>
    );
};

export default Game;

