import React from "react";

import { useTetris } from "./useTetris";

const Tetris = (props) => {

    const { draw, keyCode, ...rest } = props;


    let canvasRef = useTetris(draw, keyCode);
    return (
        <canvas ref={canvasRef} {...rest} width="240" height="400" />
    );
}

export default Tetris;