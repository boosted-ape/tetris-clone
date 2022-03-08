import React, {useState} from "react";

import { useTetris } from "./useTetris";

const Tetris = (props) => {

    const { draw, ...rest } = props;

    let event = null;

    let [canvasRef, move] = useTetris(draw, event);
    
    return (
        <canvas ref={canvasRef}       
        tabIndex="0" 
        onKeyDown={(e) => move(e)}
        width="240" height="400" />
    );
}

export default Tetris;