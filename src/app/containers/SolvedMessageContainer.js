import React from 'react';
import { connect } from 'react-redux';
import { isSolved } from '../selectors'

const SolvedMessageContainer = ({isSolved}) => {
    return (
        <div>
            {isSolved ? "Congratulations!! you have solved the puzzle!" : ""}
        </div>
    );
}

const mapStateToProps = (state) => {return {isSolved: isSolved(state)};}

export default connect(mapStateToProps,{})(SolvedMessageContainer)




