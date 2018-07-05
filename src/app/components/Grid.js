import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

const Grid = (props) => {
    const columns = props.columns;
    const rows = Math.ceil(props.tiles.length / columns); // calculate # of rows based on columns

    const tileWidth = Math.floor(props.width / columns);
    const tileHeight = Math.floor(props.height / rows);
    // round the original width & height  to adjust to the # of tiles
    // then increase by one to make sure a small edge is left on the right & bottom side.
    const width = tileWidth * columns + 1;
    const height = tileHeight * rows + 1;
    const style = {
        backgroundColor: 'darkgrey',
        width: width,
        height: height,
        position: 'relative'
    };

    return (
        <div style={style}>
            {props.tiles.map((value, index) => {
                if (value !== null) {
                    const row = Math.floor(index / columns);
                    const column = index % columns;

                    return (<Tile key={value} value={value}
                        left={column * tileWidth + 1} top={row * tileHeight + 1}
                        height={tileHeight} width={tileWidth}
                        onClick={() => props.onTileClicked(index)}
                        borderWidth={2}
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