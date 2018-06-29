import { connect } from 'react-redux'
import { moveTile } from '../actions/actions'
import Grid from '../components/Grid.js'

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        tiles: state.game.puzzle.board,
        columns: state.game.puzzle.size,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTileClicked: (tilePos) => { dispatch(moveTile(tilePos)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);