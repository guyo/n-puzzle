import GridContainer from '../../../src/app/containers/GridContainer';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { moveTile } from '../../../src/app/actions/gameActions';

const mockStore = configureMockStore();

const getStore = (size, board, checkMove=() => -1) => {
    return mockStore({
        game: {
            puzzle: board?{
                board,
                size,
                checkMove
            }: null
        }
    });
};

describe('<GridContainer>', () => {

    it('should display puzzle grid according to redux state and the props', () => {
        const store = getStore(2, [1, 2, 3, null]);
        const gcWrapper = shallow(<GridContainer height={30} width={40} store={store} />);
        const gridProps=gcWrapper.dive().find('Grid').props();

        expect(gridProps.height).toBe(30);
        expect(gridProps.width).toBe(40);
        expect(gridProps.columns).toBe(2);
        expect(gridProps.tiles).toEqual([1,2,3,null]);
    });

    it('should handle empty puzzle', () => {
        const store=getStore(0,null);
        const gcWrapper = shallow(<GridContainer height={30} width={40} store={store} />);
        const gridProps=gcWrapper.dive().find('Grid').props();

        expect(gridProps.tiles).toHaveLength(1);
        expect(gridProps.tiles[0]).toBeNull();
    });

    it('should invoke MOVE_ACTION when and only when the right tile is clicked', () => {
        const dispatch=jest.fn();
        const checkMove=jest.fn();
        const store=getStore(2, [1, 2, 3, null],checkMove);
        store.dispatch=dispatch;

        const gcWrapper = mount(<GridContainer height={30} width={40} store={store} />);
        const onTileClicked=gcWrapper.find('Grid').prop('onTileClicked');

        // checkMove fails
        checkMove.mockReturnValueOnce(-1);
        onTileClicked(1);
        expect(checkMove).toBeCalledWith(1);
        expect(dispatch).not.toBeCalled();

        // check moves succeeds
        checkMove.mockReturnValueOnce(3);
        onTileClicked(2);
        expect(checkMove).toBeCalledWith(2);
        expect(dispatch).toBeCalledWith(moveTile(2,3));
    });

});
