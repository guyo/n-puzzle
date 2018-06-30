import { connect } from 'react-redux';
import { initOpenNewGameModal } from '../actions/newGameModalActions';
import Game from '../components/Game'
import React from 'react';

const mapStateToProps = ({ game: { isSolved, puzzle } }) => {
    return {
        isSolved: isSolved,
        initialized: puzzle ? true : false
    };
}


class GameContainer extends React.PureComponent {

    componentWillMount() {
        // when no state was loaded, need to launch newGameModal
        if (!this.props.initialized)
            this.props.initOpenNewGameModal();

    }

    render() {
        return <Game isSolved={this.props.isSolved} initialized={this.props.initialized} />
    }
}

export default connect(mapStateToProps, {initOpenNewGameModal})(GameContainer)