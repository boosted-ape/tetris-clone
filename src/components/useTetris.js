import { useEffect, useRef } from "react";



export const useTetris = (drawMatrix) => {

    const matrix = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ];

    function collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                if (m[y][x] !== 0 &&
                    (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                        return true;
                }
            }
        }
        return false;
    }

    const playerRotate = (player, dir) => {
        rotate(player.matrix, dir);
        let offset = 1;
        while(collide(arena, player)){
            player.pos.x += offset;
            offset = -(offset +(offset > 0 ? 1 : -1));
            if (offset > player.matrix[0].length) {
                rotate(player.matrix, -dir);
                return;
            }
        }
    }
    
    const rotate = (m, dir) => {
        for (let y = 0; y < m.length; y++){
            for(let x = 0; x < y; x++){
                console.log(y);
                console.log(x);
                [
                    m[x][y],
                    m[y][x],
                ] =
                [
                    m[y][x],
                    m[x][y],
                ];
            }
        }
        if (dir > 0){
            m.forEach(row => row.reverse());
        } else {
            m.reverse();
        }
    }

    const createMatrix = (width, height) => {
        const matrix = [];
        while (height--) {
            matrix.push(new Array(width).fill(0));

        }
        return matrix;
    }

    const arena = createMatrix(12, 20);


    const merge = (arena, player) => {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
            })
        });
    }

    const player = {
        pos: { x: 5, y: 5 },
        matrix: matrix,
    }

    function playerDrop(){
        player.pos.y++;
        if (collide(arena, player)){
            player.pos.y--;
            merge(arena, player);
            player.pos.y = 0;
        }
        dropCounter = 0;
    }

    function movePlayer(dir){
        player.pos.x += dir;
        if (collide(arena, player)){
            player.pos.x -= dir;
        }
    }

    function move({ keyCode }) {
        if (keyCode === 37) {
            movePlayer(-1);
        }
        if (keyCode === 39) {
            movePlayer(1);
        }
        if (keyCode === 40) {
            playerDrop();
        }
        if (keyCode === 81) {
            playerRotate(player, -1);
        }
        if (keyCode === 87) {
            playerRotate(player, 1);
        }
    }
    let lastTime = 0;
    let dropInterval = 1000;
    let dropCounter = 0;

    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#000';
        context.fillRect(0, 0, 240, 400);


        context.scale(20, 20);


        function draw() {
            context.fillStyle = '#000';
            context.fillRect(0, 0, 240, 400);
            drawMatrix(context, arena, {x: 0, y: 0});
            drawMatrix(context, player.matrix, player.pos);
        }



        function update(time = 0) {
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;
            if (dropCounter > dropInterval) {
                player.pos.y++;
                if(collide(arena, player)){
                    player.pos.y--;
                    merge(arena, player);
                    player.pos.y = 0;
                }
                dropCounter = 0;
            }
            draw();
            requestAnimationFrame(update);
        }

        update();
    });

    return [canvasRef, move];
}