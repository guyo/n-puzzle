import React from 'react';
import Grid from '../../../src/app/components/Grid';
import { shallow, mount } from 'enzyme';
import { EMPTY_TILE } from '../../../src/app/utils/puzzle';


const createGrid = function (onTileClicked=(() => {/*EMPY*/})) {
    // 1 11 5 4 
    // 3 8 7 6
    // 10 9 E 2
    // Tile size: H: 20,  W: 30

    return (<Grid columns={4} height={62}
        width={122} tiles={[1,11,5,4,3,8,7,6,10,9,EMPTY_TILE,2]} onTileClicked={onTileClicked}/>);
};

describe('<Grid>', () => {
    it('should have relative position', () => {
        expect((shallow(createGrid()).find('div').prop('style').position)).toEqual('relative');
    });

    it('should have width and height rounded according to # of tiles', () => {
        const style=shallow(createGrid()).find('div').prop('style');
        expect(style.height).toEqual('61px');
        expect(style.width).toEqual('121px');
    });

    it ('should calculate tile size according to total size , columns and # of tiles ', () => {
        const div=shallow(createGrid()).find('div').children();

        expect(div.find('[value=1]').props()).toMatchObject({height: 20, width:30});
        expect(div.find('[value=2]').props()).toMatchObject({height: 20, width:30});
    });

    it('should create tiles an ignore empty tile' , () => {
        const tiles=shallow(createGrid()).find('div').children();
        expect(tiles.length).toBe(11);

        const keys=[];
        const vals=[];
        tiles.forEach((tileRW) => {
            keys.push(tileRW.key());
            vals.push(tileRW.prop('value'));
        });

        expect(vals.sort()).toEqual([1,10,11,2,3,4,5,6,7,8,9]);
        expect(keys.sort()).toEqual(['1','10','11','2','3','4','5','6','7','8','9']);
    });

    it('should assign relative positions to tiles ', () => {
        const div=shallow(createGrid()).find('div');

        expect(div.find('[value=1]').props()).toMatchObject({top: 2, left:2});
        expect(div.find('[value=11]').props()).toMatchObject({top: 2, left:32});
        expect(div.find('[value=8]').props()).toMatchObject({top: 22, left:32});
        // last tile move to last position due to empty tile
        expect(div.find('[value=2]').props()).toMatchObject({top: 42, left:92});
    });

    it('should handle clicks on tiles' , () => {
        const onTileClicked=jest.fn();
        const grid=mount(createGrid(onTileClicked));

        grid.find('[value=1]').simulate('click');
        expect(onTileClicked).toBeCalledWith(0);

        grid.find('[value=2]').simulate('click');
        expect(onTileClicked).lastCalledWith(11);
    });

});