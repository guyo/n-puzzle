import { connect } from 'react-redux';
import { initOpenNewGameModal } from '../actions/gameActions';
import Game from '../components/Game'
import React from 'react';

const mapStateToProps = ({ game: { isSolved, puzzle } }, ownProps) => {
    return {
        isSolved: isSolved,
        initialized: puzzle ? true : false
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initGame: () => dispatch(initOpenNewGameModal())
    }
}

class GameContainer extends React.Component {

    componentWillMount() {
        // when no state was loaded, need to launch newGameModal
        if (!this.props.initialized)
            this.props.initGame();

    }

    render() {
        return <Game {...this.props} />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)