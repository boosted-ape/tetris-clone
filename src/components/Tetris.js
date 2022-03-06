import React from "react";

import { useTetris } from "./useTetris";

const Tetris = (props) => {

    const { draw, ...rest } = props;


    let canvasRef = useTetris(draw);
    return (
        <canvas ref={canvasRef} {...rest} width="240" height="400" />
    );
}

export default Tetris;