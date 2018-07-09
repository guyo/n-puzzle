import Puzzle, { EMPTY_TILE } from '../../src/app/utils/puzzle';
import createStore from '../../src/app/configureStore';
import { mount } from 'enzyme';
import React from 'react';
import { newGame } from '../../src/app/actions/gameActions';
import Game from '../../src/app/components/Game';
import { Provider } from 'react-redux';
import rootReducer from '../../src/app/reducers/rootReducer';

// 1 2 3 
// 4 5 6
// 7 E 8
const puzzleTiles=[1, 2, 3, 4, 5, 6 ,7 , EMPTY_TILE, 8];
const puzzle=new Puzzle(3,puzzleTiles);

function newGameState(puzzle) {
    const state=rootReducer(undefined, newGame(3));
    state.game.puzzle=puzzle;
    state.game.originalPuzzle=puzzle;

    return state;
}

function getButtons(wrapper) {
    const buttons=wrapper.find('Button');
    const results={};
    buttons.forEach((button) => {
        results[button.prop('id')]=button;
    });
    return results;
}

function getTiles(wrapper) {
    const tiles=wrapper.find('Tile');
    const results = new Array(9).fill(EMPTY_TILE);
    tiles.forEach((tile) => {
        const value=parseInt(tile.prop('value'));
        const row=Math.floor(parseInt(tile.prop('top'))/parseInt(tile.prop('height')));
        const col=Math.floor(parseInt(tile.prop('left'))/parseInt(tile.prop('width')));
        results[row*3+col]=value;
    });
    return results;
}


describe('Integration', () => {
    it('should launch newGameModal on start and close it on click start', () => {
        const store=createStore();
        const gameWrapper=mount( <Provider store={store}><Game /></Provider>);
        const newGameModal=gameWrapper.find('NewGameModal');

        expect(newGameModal.length).toBe(1);
        expect(newGameModal.prop('show')).toBe(true);
        expect(newGameModal.prop('title')).toContain('Welcome');
        const button=newGameModal.find('Button');
        expect(button.length).toBe(1);
        expect(button.text()).toContain('Start');

        // check that hitting new game gets the modal close. 
        // enzyme forces to refine the element in order to get props changed
        button.simulate('click');
        expect(gameWrapper.find('NewGameModal').prop('show')).toBe(false);
    });

    it ('should not launch newGameModal when state is initialized', () => {
        const gameWrapper=mount( <Provider store={createStore(newGameState(puzzle))}><Game /></Provider>);
        expect(gameWrapper.find('NewGameModal').prop('show')).toBe(false);
    });

    it('should display all tiles and buttons ', () => {
        const store=createStore(newGameState(puzzle));
        const gameWrapper=mount(<Provider store={store}><Game /></Provider>);

        expect(gameWrapper.find('Tile').length).toBe(8);
        expect(getTiles(gameWrapper)).toEqual(puzzleTiles);

        const buttons=getButtons(gameWrapper.find('ControlPanel'));
        expect(Object.keys(buttons).sort()).toEqual(['newgame','reset','undo']);
    });

    it('should start a new with the given size', () => {
        const store=createStore(newGameState(puzzle));
        const gameWrapper=mount(<Provider store={store}><Game /></Provider>);

        const controlButtons=getButtons(gameWrapper.find('ControlPanel'));
        controlButtons.newgame.simulate('click');

        let newGameModal=gameWrapper.find('NewGameModal');
        expect(newGameModal.prop('show')).toBe(true);

        const modalButtons=getButtons(newGameModal);
        modalButtons.newgamestart.simulate('click');
        newGameModal=gameWrapper.find('NewGameModal');
        expect(newGameModal.prop('show')).toBe(false);
        expect(getTiles(gameWrapper)).not.toEqual(puzzleTiles);
    });

    it('should move tiles when clicked', () => {
        const store=createStore(newGameState(puzzle));
        const gameWrapper=mount(<Provider store={store}><Game /></Provider>);

        // no change when click on unclickable button
        gameWrapper.find('Tile[value=1]').simulate('click');
        expect(getTiles(gameWrapper)).toEqual(puzzleTiles);

        gameWrapper.find('Tile[value=7]').simulate('click');
        expect(getTiles(gameWrapper)).toEqual([1,2,3,4,5,6,EMPTY_TILE,7,8]);
    });

    it('should undo a move ', () => {
        const store=createStore(newGameState(puzzle));
        const gameWrapper=mount(<Provider store={store}><Game /></Provider>);

        let buttons=getButtons(gameWrapper);
        expect(buttons.undo.prop('disabled')).toBe(true);

        gameWrapper.find('Tile[value=5]').simulate('click');
        gameWrapper.find('Tile[value=2]').simulate('click');
        buttons=getButtons(gameWrapper);
        expect(buttons.undo.prop('disabled')).toBe(false);

        buttons.undo.simulate('click');
        expect(getTiles(gameWrapper)).toEqual([1,2,3,4,EMPTY_TILE,6,7,5,8]);

        buttons.undo.simulate('click');
        buttons=getButtons(gameWrapper);
        expect(buttons.undo.prop('disabled')).toBe(true);
    });

    // should reset a game
    it('should reset a game ', () => {
        const store=createStore(newGameState(puzzle));
        const gameWrapper=mount(<Provider store={store}><Game /></Provider>);

        let buttons=getButtons(gameWrapper);
        expect(buttons.reset.prop('disabled')).toBe(true);

        gameWrapper.find('Tile[value=5]').simulate('click');
        gameWrapper.find('Tile[value=2]').simulate('click');
        gameWrapper.find('Tile[value=1]').simulate('click');

        buttons=getButtons(gameWrapper);
        expect(buttons.reset.prop('disabled')).toBe(false);

        buttons.reset.simulate('click');
        expect(getTiles(gameWrapper)).toEqual(puzzleTiles);
        buttons=getButtons(gameWrapper);
        expect(buttons.reset.prop('disabled')).toBe(true);
        expect(buttons.undo.prop('disabled')).toBe(true);
    });

    // should show its solved!
    it('should pop up a solved message ', () => {
        const store=createStore(newGameState(puzzle));
        const gameWrapper=mount(<Provider store={store}><Game /></Provider>);

        expect(gameWrapper.find('SolvedModal').prop('show')).toBe(false);

        gameWrapper.find('Tile[value=8]').simulate('click');
        expect(gameWrapper.find('SolvedModal').prop('show')).toBe(true);

        const buttons=getButtons(gameWrapper);
        buttons.solvedcancel.simulate('click');
        expect(gameWrapper.find('SolvedModal').prop('show')).toBe(false);
    });

});