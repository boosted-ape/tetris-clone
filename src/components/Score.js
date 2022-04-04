import React from 'react';

const Score = (props) => {
    const {score, ...rest} = props;
    return(
        <p>{score}</p>
    );
}

export default Score;