var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
    [2, 1, 1, 2, 1, 2, 3, 2, 1, 2],
    [2, 1, 1, 2, 3, 2, 1, 2, 1, 2],
    [2, 1, 1, 2, 2, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
var score = 0;

var pacman = {
    x: 1,
    y: 1
};

function displayWorld() {
    var output = '';

    for (var i = 0; i < world.length; i++) {
        output += "\n<div class='row'>\n";
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 2) {
                output += "<div class='brick'></div>";
            } else if (world[i][j] == 1) {
                output += "<div class='coin'></div>";
            } else if (world[i][j] == 0) {
                output += "<div class='empty'></div>";
            } else if (world[i][j] == 3) {
                output += "<div class='cherry'></div>";
            }
        }
        output += "\n</div>";
    }
    // console.log(output);
    document.getElementById('world').innerHTML = output;
}
function displayPacman() {
    document.getElementById('pacman').style.top = pacman.y * 20 + "px";
    document.getElementById('pacman').style.left = pacman.x * 20 + "px";
}

function displayScore() {
    document.getElementById('score').innerHTML = score;
}

displayWorld();
displayPacman();
displayScore();

document.onkeydown = function (e) {
    if (e.keyCode == 37 && world[pacman.y][pacman.x - 1] != 2) {
        pacman.x--;
        document.getElementById('pacman').setAttribute('style', 'transform: rotate(180deg)');
    }
    else if (e.keyCode == 39 && world[pacman.y][pacman.x + 1] != 2) {
        pacman.x++;
        document.getElementById('pacman').setAttribute('style', 'transform: rotate(0deg)');
    }
    else if (e.keyCode == 38 && world[pacman.y - 1][pacman.x] != 2) {
        pacman.y--;
        document.getElementById('pacman').setAttribute('style', 'transform: rotate(270deg)');
    }
    else if (e.keyCode == 40 && world[pacman.y + 1][pacman.x] != 2) {
        pacman.y++;
        document.getElementById('pacman').setAttribute('style', 'transform: rotate(90deg)');
    }

    if (world[pacman.y][pacman.x] == 1) {
        world[pacman.y][pacman.x] = 0;
        score += 10;
        displayWorld();
        displayScore();
    } else if (world[pacman.y][pacman.x] == 3) {
        world[pacman.y][pacman.x] = 0;
        score += 50;
        displayWorld();
        displayScore();
    }
    // console.log(e.keyCode);
    displayPacman();
}

function randomWorld() {
    var wallCount = 0;
    let wallLimit = 15;
    var cherryCount = 0, cherryLimit = 3;
    for (var i = 0; i < world.length; i++) {
        for (var j = 0; j < world[i].length; j++) {
            if (i == 0 || j == 0 || i == world.length - 1 || j == world[i].length - 1) {
                world[i][j] = 2;
            } else {
                let genTile = Math.floor(Math.random() * 3);
                if (genTile == 2 && (wallCount < wallLimit)) {
                    world[i][j] = 2;
                    wallCount++;
                } else if (genTile == 1 && cherryCount < cherryLimit) {
                    world[i][j] = 3;
                    cherryCount++;
                } else {
                    world[i][j] = 1;
                }
            }
        }
    }
    pacman.x = 1;
    pacman.y = 1;
    displayWorld();
    displayPacman();
}