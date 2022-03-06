import { useEffect, useRef } from "react";



export const useTetris = ( drawMatrix) => {

    const matrix = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ];


    const player = {
        pos: {x: 5, y: 5},
        matrix: matrix,
    }
    

    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#000';
        context.fillRect(0, 0, 240, 400);



        context.scale(20, 20);


        function draw(){
            context.fillStyle = '#000';
            context.fillRect(0, 0, 240, 400);
            drawMatrix(context, player.matrix, player.pos);
        }

        let lastTime = 0;
        let dropInterval = 1000;
        let dropCounter = 0;

        function update(time = 0){
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;
            if (dropCounter > dropInterval){
                player.pos.y++;
                dropCounter = 0;
            }
            draw();
            requestAnimationFrame(update);
        }

        update();
    });

    return canvasRef;
}