import React, { useRef } from "react";

import { useTetris } from "./useTetris";

const Tetris = (props) => {

    const canvasRef = useRef(null);

    useTetris(canvasRef);
    return(   
            <canvas ref={canvasRef} {...props} width="240" height="400"/>
    );
}

export default Tetris;