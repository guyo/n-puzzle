import { connect } from 'react-redux';
import Game from '../components/Game'

const mapStateToProps = ({ game: { isSolved, puzzle } }) => {
    return {
        isSolved: isSolved,
    };
}


export default connect(mapStateToProps,{})(Game)