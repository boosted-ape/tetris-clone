import React, { useState } from "react";

import { createStage } from '../gameHelpers';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player] = usePlayer();
    const [stage, setStage] = useStage(player)

    console.log('re-render');

    const movePlayer = dir => {

    }

    const startGame = () => {

    }

    const drop = () => {

    }

    const dropPlayer = () => {

    }

    const move = ({keyCode}) => {
        if (!gameOver){
            if (keyCode === 37){
                movePlayer(-1);
            }
            else if (keyCode === 39){
                movePlayer(1);
            }
            else if (keyCode === 40){
                drop()
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
            <Stage stage={stage}/>
            <aside>
                {gameOver ? (
                    <Display gameOver={gameover} text="Game Over"/>
                ): (
                    <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </div>
                )
                }
                
                <StartButton/>
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>);
};

export default Tetris;