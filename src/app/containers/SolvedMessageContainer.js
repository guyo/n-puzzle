import React from 'react';
import { connect } from 'react-redux';
import { isSolved } from '../selectors'

const mapStateToProps = (state) => {return {isSolved: isSolved(state)};}

const SolvedMessageContainer = ({isSolved}) => {
    return (
        <div>
            {isSolved ? "Congratulations!! you have solved the puzzle!" : ""}
        </div>
    );
}

export default connect(mapStateToProps,{})(SolvedMessageContainer)




