import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

// custom hook for memoizing the callbacks passed to tiles solving 2 issues:
// memozie callback per index and update the master callback without changing the callbacks 
function useCallbackFactory(masterCallback) {
    const [callbackFactory, _] = useState({ masterCallback, callbacks: [] });
    if (callbackFactory.masterCallback !== masterCallback)
        callbackFactory.masterCallback = masterCallback;
    const callbacks = callbackFactory.callbacks;
    return (index) => callbacks[index] || (callbacks[index] = () => callbackFactory.masterCallback(index));
}

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
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative'
    };

    const getCallback = useCallbackFactory(props.onTileClicked);

    return (
        <div style={style} id='grid'>
            {props.tiles.map((value, index) => {
                if (value !== null) {
                    const row = Math.floor(index / columns);
                    const column = index % columns;

                    return (<Tile key={value} value={value}
                        left={column * tileWidth + 2} top={row * tileHeight + 2}
                        height={tileHeight} width={tileWidth} borderWidth={2}
                        onClick={getCallback(index)}
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