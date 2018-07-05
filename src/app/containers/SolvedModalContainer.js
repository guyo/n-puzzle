import { connect } from 'react-redux';
import { isSolved } from '../selectors';
import { openNewGameModal, closeSolvedModal } from '../actions/modalActions';
import SolvedModal from '../components/SolvedModal';

const mapStateToPros = (state) => {
    return {
        show: isSolved(state) && state.modal.canShowSolved
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: () => { dispatch(closeSolvedModal()); },
        onNewGame: () => { dispatch(openNewGameModal()); }
    };
};


export default connect(mapStateToPros, mapDispatchToProps)(SolvedModal);