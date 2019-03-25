import React from 'react';
import PropTypes from 'prop-types';

const Tile = props => {
    // use border width as long as it doesnt cover more than half the tile
    const size = Math.min(props.height, props.width);
    const borderWidth = props.borderWidth > 0.3 * size ? 1 : props.borderWidth;
    const style = {
        backgroundColor: ['green', 'brown'][Math.floor(props.value % 2)],
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // set transition
        transitionProperty: 'top, left',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in',
        // set position
        position: 'absolute',
        top: `${props.top}px`,
        left: `${props.left}px`,
        // height and width are reduced by double the size of the border
        border: `${borderWidth}px solid white`,
        height: `${props.height - borderWidth * 2}px`,
        width: `${props.width - borderWidth * 2}px`,

        fontSize: size * 0.4,
        fontWeight: 'bold'
    };

    return <div style={style} onClick={props.onClick}>{props.value}</div>;
};

Tile.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    value: PropTypes.any.isRequired,
    borderWidth: PropTypes.number,
    onClick: PropTypes.func
};

Tile.defaultProps = {
    borderWidth: 1
};

export default React.memo(Tile);
