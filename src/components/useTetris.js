import { useEffect } from "react";

export const useTetris = (canvasRef) => {

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#000';
        context.fillRect(0, 0, 240, 400);
    });
}