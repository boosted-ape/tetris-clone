import { useState } from 'react';

import {createStage} from '../gamehelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useStage(createStage());

    return [stage, setStage];
}