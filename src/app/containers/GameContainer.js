import { connect } from 'react-redux';
import { openNewGameModal, NEWGAMEMODAL_MODES } from '../actions/actions';
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
        initGame: () => dispatch(openNewGameModal(NEWGAMEMODAL_MODES.INIT))
    }
}

class GameContainer extends React.Component {

    componentWillMount() {
        // when no state was loaded from somwhere, need to create the puzzle first
        if (!this.props.initialized)
            this.props.initGame();

    }

    render() {
        return <Game {...this.props} />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)