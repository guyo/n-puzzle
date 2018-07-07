import React from 'react';
import Tile from '../../../src/app/components/Tile';
import { mount } from 'enzyme';

const EMPTY=() => {/*empty function - comment to pass lint*/};

describe('<Tile>', () => {
    it('should display a tile', () => {
        const divRW=mount(<Tile top={100} left={200} height={10}
            width={15} value={1} borderWidth={2}
            onClick={EMPTY} />).find('div');


        expect(divRW.length).toBe(1);

        expect(divRW.text()).toEqual('1');
        const style=divRW.prop('style');
        expect(style.top).toBe('100px');
        expect(style.left).toBe('200px');
        expect(style.border).toContain('2px');
        expect(style.height).toBe('6px'); //minus border width * 2
        expect(style.width).toBe('11px');
    });

    it('should display color according to value', () => {
        const tile1Color=mount(<Tile top={1} left={1} height={1}
            width={1} value={1} borderWidth={0}
            onClick={EMPTY} />).find('div').prop('style').backgroundColor;

        const tile2Color=mount(<Tile top={1} left={1} height={1}
            width={1} value={2} borderWidth={0}
            onClick={EMPTY} />).find('div').prop('style').backgroundColor;

        expect(tile1Color).toEqual('brown');
        expect(tile2Color).toEqual('green');
    });

    it('should invoke onClick when clicked', () => {
        const onClick=jest.fn();
        const tile=mount(<Tile top={1} left={1} height={1}
            width={1} value={1} borderWidth={0}
            onClick={onClick} />);

        tile.find('div').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it ('should not allow border to big ', () => {
        const tile=mount(<Tile top={1} left={1} height={15}
            width={50} value={1} borderWidth={11}
            onClick={EMPTY} />);

        expect(tile.find('div').prop('style').border).not.toContain('11');

    });
});
