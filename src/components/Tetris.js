import React, { useRef } from "react";

import { useTetris } from "./useTetris";

const Tetris = (props) => {

    const canvasRef = useRef(null);
    useTetris(canvasRef);


    return(
        <>    
            <canvas ref={canvasRef} width="240" height="400"/>
            <script src="tetrisgame.js"></script>
        </>
    );
}

export default Tetris;