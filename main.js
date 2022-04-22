

function getAggregateHeight(arena) {

    let heights = getColHeight(arena)
    var aggregateHeight = heights.reduce((a, b) => a + b, 0);
    return aggregateHeight;
}

function getColHeight(arena) {
    let heights = Array(12).fill(0);
    let cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    for (let [neg_height, row] of arena.entries()) {
        inner: for (let [i, val] of row.entries()) {
            if (val === 0 || !(cols.includes(i))) {
                continue inner;
            }
            heights[i] = 20 - neg_height;
            for (var j = 0; j < cols.length; j++) {
                if (cols[j] === i) {
                    cols.splice(j, 1);
                }
            }
        }
    }

    return heights;
}

function getHoleCount(arena) {
    let holes = 0;
    let cols = Array(12).fill(0);

    for (let [neg_height, row] of arena.entries()) {
        let height = 20 - neg_height
        for (let [i, val] of row.entries()) {
            if (val === 0 && cols[i] > height) {
                holes += 1;
                continue;
            }
            if (val !== 0 && cols[i] == 0) {
                cols[i] = height;
            }
        }
    }

    return holes;
}

function getBumpiness(arena) {
    let bumpiness = 0;
    let heights = getColHeight(arena);

    for (var i = 1; i < heights.length; i++) {
        bumpiness += Math.abs(heights[i - 1] - heights[i])
    }
    return bumpiness;
}

function calculateMoves(arena,player) {
    var best_fitness = -9999;
    var best_tile_index = -1;
    var best_rotation = -1;
    var best_x = -1;

    for( var rotationCount = 0; rotationCount < 4; rotationCount++){
        for( var x = 0; x < 12; x++){
            var new_board = getFutureBoard(arena, player);
            var fitness = getFitnessScore(new_board);
            if(fitness > best_fitness){
                best_fitness = fitness;
                best_rotation = rotationCount;
                best_x = x;
            }
        }
        player.rotate()
    }
}

//use on copies of arena only
function getFitnessScore(arena) {
    let score = WEIGHT_LINE_CLEARED * arenaSweep(arena);
    score += WEIGHT_AGGREGATE_HEIGHT * getAggregateHeight(arena);
    score += WEIGHT_HOLES * getHoleCount(arena);
    score += WEIGHT_BUMPINESS * getBumpiness(arena);
    return score;
}

function getFutureBoard(arena, player) {
    const futureArena = arena;
    const futurePlayer = player;

    while (!collide(futureArena, futurePlayer)) {
        futurePlayer.pos.y++;
    }
    futurePlayer.pos.y--;
    merge(futureArena, futurePlayer);
    return [futureArena];

}




function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 0, 0, 0],
            [5, 5, 5, 5],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

const tetri = [];

const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const tetris = new Tetris(element);
    tetri.push(tetris);
});

const keyListener = (event) => {
    [
        [65, 68, 81, 69, 83],
        [72, 75, 89, 73, 74],
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(1);
            } else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {
                player.rotate(1);
            }
        }

        if (event.keyCode === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);