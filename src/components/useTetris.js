import { useEffect, useRef } from "react";



export const useTetris = (drawMatrix) => {

    const matrix = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ];

    const pieces = "ILJSZOT";

    const createPiece = (type) => {
        if (type === 'I') {
            return [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
        } else if (type === 'L') {
            return [
                [0, 0, 2],
                [2, 2, 2],
                [0, 0, 0],
            ];
        } else if (type === 'J') {
            return [
                [3, 0, 0],
                [3, 3, 3],
                [0, 0, 0],
            ];
        } else if (type === 'O') {
            return [
                [4, 4],
                [4, 4],
            ];
        } else if (type === 'Z') {
            return [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ];
        } else if (type === 'S') {
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        } else if (type === 'T') {
            return [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0],
            ];
        }
    }

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
        matrix: createPiece(pieces[Math.floor(pieces.length * Math.random())]),
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

    function playerHardDrop(){
        while(!collide(arena, player)){
            player.pos.y++;
        }
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
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
        if (keyCode === 32) {
            playerHardDrop();
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
                playerDrop();
            }
            draw();
            requestAnimationFrame(update);
        }

        update();
    });

    return [canvasRef, move];
}