import React from 'react';
import { connect } from 'react-redux';

const SolvedMessageContainer = ({isSolved}) => {
    return (
        <div>
            {isSolved ? "Congratulations!! you have solved the puzzle!" : ""}
        </div>
    );
}

const mapStateToProps = ({game: {isSolved}}) => {
    return {isSolved};
}

export default connect(mapStateToProps,{})(SolvedMessageContainer)




