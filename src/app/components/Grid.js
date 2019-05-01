import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';


const Grid = ({columns, height, width, tiles, onTileClicked}) => {
    const rows = Math.ceil(tiles.length / columns); // calculate # of rows based on columns

    const tileWidth = Math.floor(width / columns);
    const tileHeight = Math.floor(height / rows);

    // round the original width & height  to adjust to the # of tiles
    // then increase by one to make sure a small edge is left on the right & bottom side.
    const style = {
        width: `${tileWidth * columns + 1}px`,
        height: `${tileHeight * rows + 1}px`,
        position: 'relative',
        backgroundColor: 'darkgrey'
    };

    // create memoized list of callbacks for the tiles to prevent them from re-rendering
    const callbacks=useMemo(() => [...Array(tiles.length).keys()].map(i => () => onTileClicked(i)),
        [tiles.length, onTileClicked]);

    return (
        <div style={style} id='grid'>
            {tiles.map((value, index) => {
                if (value !== null) {
                    const row = Math.floor(index / columns);
                    const column = index % columns;

                    return (<Tile key={value} value={value}
                        left={column * tileWidth + 2} top={row * tileHeight + 2}
                        height={tileHeight} width={tileWidth} borderWidth={2}
                        onClick={callbacks[index]}
                    />);
                } else
                    return null;
            })}
        </div>);
};

Grid.propTypes = {
    columns: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.number).isRequired,
    onTileClicked: PropTypes.func.isRequired
};

export default Grid;