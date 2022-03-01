import { useEffect, useState } from 'react';

import {createStage} from '../../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
            //flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)))
        }
    })
    return [stage, setStage];
}