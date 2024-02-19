// Fonction pour redimensionner le canvas en fonction de la taille de l'écran.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Fonction pour initialiser le jeu.
function init() {
    resizeCanvas(); // Redimensionne le canvas au chargement de la page
    createplat(); // Crée les plateformes
    setInterval(loop, 22); // Lance la boucle de jeu
}

// Les attributs du joueur.
var player = {
    x: 0.2 * window.innerWidth,
    y: 0.7 * window.innerHeight,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 0.05 * window.innerHeight,
    width: 0.05 * window.innerHeight
};

// Le statut des touches fléchées et "zqsd".
var keys = {
    right: false,
    left: false,
    up: false,
    d: false,
    q: false,
    z: false
};

// La gravité et la friction pour des mouvements réalistes.
var gravity = 0.6;
var friction = 0.7;

// Le nombre de plateformes.
var num = 2;

// Les plateformes.
var platforms = [];

// Fonction pour dessiner le canvas.
function rendercanvas() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Fonction pour dessiner le joueur.
function renderplayer() {
    ctx.fillStyle = "#F08080";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Fonction pour créer les plateformes.
function createplat() {
    for (i = 0; i < num; i++) {
        platforms.push(
            {
                x: 0.1 * window.innerWidth * i,
                y: 0.7 * window.innerHeight + (0.03 * window.innerHeight * i),
                width: 0.11 * window.innerWidth,
                height: 0.015 * window.innerHeight
            }
        );
    }
}

// Fonction pour dessiner les plateformes.
function renderplat() {
    ctx.fillStyle = "#45597E";
    for (var i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

// Fonction pour redémarrer le jeu.
function restartGame() {
    // Remettre le joueur à sa position initiale.
    player.x = 200;
    player.y = 200;
    player.x_v = 0;
    player.y_v = 0;
    player.jump = true;

    // Réinitialiser les plateformes.
    platforms = [];
    createplat();
}

// Cette fonction est appelée lorsqu'une touche du clavier est enfoncée.
function keydown(e) {
    if (e.key == "ArrowLeft" || e.key == "q") {
        keys.left = true;
    }
    if (e.key == "ArrowUp" || e.key == "z") {
        if (player.jump == false) {
            player.y_v = -10;
        }
    }
    if (e.key == "ArrowRight" || e.key == "d") {
        keys.right = true;
    }
    if (e.key == "r") {
        restartGame();
    }
}

// Cette fonction est appelée lorsqu'une touche du clavier est relâchée.
function keyup(e) {
    if (e.key == "ArrowLeft" || e.key == "q") {
        keys.left = false;
    }
    if (e.key == "ArrowUp" || e.key == "z") {
        if (player.y_v < -2) {
            player.y_v = -3;
        }
    }
    if (e.key == "ArrowRight" || e.key == "d") {
        keys.right = false;
    }
}

function loop() {
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        player.y_v += gravity;
    }
    player.jump = true;
    if (keys.left) {
        player.x_v = -2.5;
    }
    if (keys.right) {
        player.x_v = 2.5;
    }
    player.y += player.y_v;
    player.x += player.x_v;

    for (var i = 0; i < platforms.length; i++) {
        if (player.x < platforms[i].x + platforms[i].width &&
            player.x + player.width > platforms[i].x &&
            player.y < platforms[i].y + platforms[i].height &&
            player.y + player.height > platforms[i].y) {
            player.jump = false;
            player.y = platforms[i].y - player.height;
            break;
        }
    }

    rendercanvas();
    renderplayer();
    renderplat();
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

// Appeler la fonction d'initialisation au chargement de la page.
window.addEventListener("load", init);
// Appeler la fonction de redimensionnement à chaque fois que la fenêtre est redimensionnée.
window.addEventListener("resize", resizeCanvas);