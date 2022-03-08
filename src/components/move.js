export const move = (keyCode) => {
    console.log(moving);
    if (keyCode === 37) {
        player.pos.x--;
        console.log(player.pos);
    }
    if (keyCode === 39) {
        player.pos.x++;
        console.log(player.pos);
    }
    if (keyCode === 40) {
        player.pos.y++;
        console.log(player.pos);
        dropCounter = 0
    }
}