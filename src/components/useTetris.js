import { useEffect } from "react";

export const useTetris = (canvasRef) => {

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#000';
        context.fillRect(0, 0, 240, 400);

        const matrix = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];

        context.scale(20, 20);

        function drawMatrix(matrix, offset) {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        context.fillStyle = 'red';
                        context.fillRect(x + offset.x, y + offset.y, 1, 1);
                    }
                });
            });
        };
        const player = {
            pos: {x: 5, y: 5},
            matrix: matrix,
        }

        drawMatrix(player.matrix, player.pos)

    });
}