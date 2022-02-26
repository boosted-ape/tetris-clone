import { useState } from "react";

import { randomTetrimino } from "../tetrominos";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: randomTetrimino().shape,
        collided: false,
    });

    const playerState = useState();
    const player = playerState[0];
}