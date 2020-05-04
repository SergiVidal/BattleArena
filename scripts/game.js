//TODO: JSDoc como definir estas variables de clase
let player;
let playerAPI;
let map;

/** Esta función es la primera que se llama cuando la aplicacion es iniciada **/
window.onload = function () {
    initGame();
};

/** Inicializa el juego**/
function initGame() {
    initObjects();
    initUI();
}

/** Inicicializa las clases necesarias para el desarrollo del juego **/
function initObjects() {
    playerAPI = new PlayerAPI();
    map = new Map();
    map.initBoolMatrix();
    map.initDomMatrix();
}


/** Inicializa los componentes de la UI **/
function initUI() {
    addTextToConsole("Bienvenido a Battle Arena! (Desarrollado por <b>Sergi Vidal</b>)");

    createMap();
    addButtonsEvent();
    blockRevivePlayerButton();
    blockDeletePlayerButton();
    blockRankingButton();
    blockControlButtons();
}

/**
 * Se encarga de hacer aparecer el formulario de creación del jugador
 */
function openCreatePlayerFrom() {
    document.getElementsByClassName("form-popup")[0].style.display = "block";
}

/**
 * Se encarga de hacer desaparecer el formulario de creación del jugador
 */
function closeCreatePlayerForm() {
    document.getElementsByClassName("form-popup")[0].style.display = "none";
}

/**
 * Inicializa el formulario para crear el nuevo jugador
 */
function addButtonsEvent() {
    closeCreatePlayerForm();
    document.getElementById('btn-close-create-player').addEventListener("click", closeCreatePlayerForm);
    document.getElementById('form-create-player').addEventListener("click", onClickCreateNewPlayer);

    document.getElementById('new-player').addEventListener("click", openCreatePlayerFrom);
    document.getElementById('revive-player').addEventListener("click", onClickRevivePlayer);
    document.getElementById('delete-player').addEventListener("click", onClickDeletePlayer);
    document.getElementById('ranking').addEventListener("click", onClickShowRanking);

    initPlayersControls();

}

/**
 * Función onClick del botón Crear un nuevo jugador, se encarga de gestionar las fuciones encargadas de crear el jugador y de obtener su información mediante llamadas a la API
 */
function onClickCreateNewPlayer() {
    let playerName = document.getElementById('input-player-name').value;
    closeCreatePlayerForm();
    playerAPI.createNewPlayer(playerName, function (response, status, token) {
        addTextToConsole(response);

        if (status === 200) {
            console.log(token);
            playerAPI.setToken(token);
            playerAPI.getCurrentPlayerInfo(playerAPI.getToken, function (response, status, object) {
                addTextToConsole(response);

                if (status === 200) {
                    player = new Player(object);
                    updateViewWithPlayerInfo();
                    blockCreatePlayerButton();
                    enableRevivePlayerButton();
                    enableDeletePlayerButton();
                    enableRankingButton();
                    enableControlButtons();
                    getMapInfo();

                }
            })
        }
    });

}

/**
 * Función onClick del botón Revivir el jugador actual, se encarga de gestionar las fuciones encargadas de revivir el jugador y de obtener su información mediante llamadas a la API
 */
function onClickRevivePlayer() {
    playerAPI.respawnCurrentPlayer(playerAPI.getToken, function (response, status) {
        addTextToConsole(response);
        if (status === 200) {
            playerAPI.getCurrentPlayerInfo(playerAPI.getToken, function (response, status, object) {
                addTextToConsole(response);

                if (status === 200) {
                    player = new Player(object);
                    updateViewWithPlayerInfo();
                }
            });
        }
    });
}

/**
 * Función onClick del botón Eliminar el jugador actual, se encarga de gestionar las fuciones encargadas de eliminar el jugador mediante una llamada a la API
 */
function onClickDeletePlayer() {
    playerAPI.deleteCurrentPlayer(playerAPI.getToken, function (response, status) {
        addTextToConsole(response);

        if (status === 200) {
            player = null;
            updateViewWithPlayerInfo();
            enableCreatePlayerButton();
            blockRevivePlayerButton();
            blockDeletePlayerButton();
            blockRankingButton();
            blockControlButtons();
        }
    });
}

/**
 * Función onClick del botón Mostrar Ranking, se encarga de gestionar las fuciones encargadas de Mostrar el Ranking mediante una llamada a la API
 */
function onClickShowRanking() {
    playerAPI.showRanking(function (response, status, object) {
        addTextToConsole(response);

        if (status === 200) {

            console.log(object);
        }
    });
}

/**
 * Función encargada de actualizar informació del usuario en el HTMl
 */
function updateViewWithPlayerInfo() {
    let playerStats = document.getElementById('stats');
    playerStats.innerHTML = "";
    if (player !== null) {
        createH3Element("Name: " + player.name, playerStats);
        createH3Element("Attack: " + player.attack, playerStats);
        createH3Element("Defense: " + player.defense, playerStats);
        createH3Element("Vitality Points: " + player.vp, playerStats);
    } else {
        createH3Element("Name: -", playerStats);
        createH3Element("Attack: -", playerStats);
        createH3Element("Defense: -", playerStats);
        createH3Element("Vitality Points: -", playerStats);
    }

}

/**
 * Función encargada de crear un elemento H3
 */
function createH3Element(data, tag) {
    let node = document.createElement("H3");
    let textNode = document.createTextNode(data);
    node.appendChild(textNode);
    tag.appendChild(node);
}

/**
 * Función encargada de bloquear el botón de crear un nuevo jugador
 */
function blockCreatePlayerButton() {
    let createBtn = document.getElementById('new-player');
    createBtn.style.pointerEvents = "none";
    createBtn.style.backgroundColor = "grey";
}

/**
 * Función encargada de bloquear el botón de revivir el jugador actual
 */
function blockRevivePlayerButton() {
    let reviveBtn = document.getElementById('revive-player');
    reviveBtn.style.pointerEvents = "none";
    reviveBtn.style.backgroundColor = "grey";
}

/**
 * Función encargada de bloquear el botón de eliminar el jugador actual
 */
function blockDeletePlayerButton() {
    let deleteBtn = document.getElementById('delete-player');
    deleteBtn.style.pointerEvents = "none";
    deleteBtn.style.backgroundColor = "grey";
}

/**
 * Función encargada de bloquear el botón de mostrar el ranking
 */
function blockRankingButton() {
    let rankingBtn = document.getElementById('ranking');
    rankingBtn.style.pointerEvents = "none";
    rankingBtn.style.backgroundColor = "grey";
}

/**
 * Función encargada de desbloquear el botón de crear un nuevo jugador
 */
function enableCreatePlayerButton() {
    let createBtn = document.getElementById('new-player');
    createBtn.style.pointerEvents = "auto";
    createBtn.style.backgroundColor = "#ec2d42";
}

/**
 * Función encargada de desbloquear el botón de revivir el jugador actual
 */
function enableRevivePlayerButton() {
    let reviveBtn = document.getElementById('revive-player');
    reviveBtn.style.pointerEvents = "auto";
    reviveBtn.style.backgroundColor = "#ec2d42";
}

/**
 * Función encargada de desbloquear el botón de eliminar el jugador actual
 */
function enableDeletePlayerButton() {
    let deleteBtn = document.getElementById('delete-player');
    deleteBtn.style.pointerEvents = "auto";
    deleteBtn.style.backgroundColor = "#ec2d42";
}

/**
 * Función encargada de desbloquear el botón de mostrar ranking
 */
function enableRankingButton() {
    let rankingBtn = document.getElementById('ranking');
    rankingBtn.style.pointerEvents = "auto";
    rankingBtn.style.backgroundColor = "#ec2d42";
}

//TODO: preguntar como hacer la consola, su tipo de tag y que contenga un scroll!
/**
 * FUncion encargada de añadir logs a la consola
 * @param text - Información de lo sucedido
 */
function addTextToConsole(text) {
    let console = document.getElementById('console');
    console.innerHTML = console.innerHTML + "[" + getTime() + "]: " + text + "</br>";
}

/**
 * Se encarga de crear el Map segun las filas y columnas definidas
 */
function createMap() {
    let mapUI = document.getElementById('map');

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            let node = document.createElement("DIV");
            node.setAttribute("class", "cell");
            mapUI.appendChild(node);

            console.log(typeof node);
            map.setDomCell(i, j, node);

        }
    }
}

/**
 * Función encargada de obtener la hora actual.
 * @returns {string} - Devuelve un string en formato HH:MM:SS
 */
function getTime() {
    let pad = function (input) {
        return input < 10 ? "0" + input : input;
    };
    let date = new Date();
    return [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
    ].join(':');
}

/**
 * Función encargada de inicializar los controles del Jugador.
 */
function initPlayersControls() {
    initAttackControls();
    initMoveControls();
}

/**
 * Función encargada de asignar un onClick a los controles de ataque.
 */
function initAttackControls() {
    document.getElementById('attack-north').addEventListener("click", function () {
        onClickAttack("N")
    });
    document.getElementById('attack-west').addEventListener("click", function () {
        onClickAttack("O")
    });
    document.getElementById('attack-east').addEventListener("click", function () {
        onClickAttack("E")
    });
    document.getElementById('attack-south').addEventListener("click", function () {
        onClickAttack("S")
    });
}

/**
 * Función encargada de asignar un onClick a los controles de movimiento.
 */
function initMoveControls() {
    document.getElementById('move-north').addEventListener("click", function () {
        onClickMove("N")
    });
    document.getElementById('move-west').addEventListener("click", function () {
        onClickMove("O")
    });
    document.getElementById('move-east').addEventListener("click", function () {
        onClickMove("E")
    });
    document.getElementById('move-south').addEventListener("click", function () {
        onClickMove("S")
    });
}

/**
 * Función encargada de bloquear los controles del Jugador
 */
function blockControlButtons() {
    document.querySelectorAll('.box').forEach(function (element) {
        element.style.pointerEvents = "none";
        element.style.background = "grey";
    });
}

/**
 * Función encargada de desbloquear los controles del Jugador
 */
function enableControlButtons() {
    document.querySelectorAll('.box').forEach(function (element) {
        element.style.pointerEvents = "auto";
        element.style.background = "none";
    });
}

/**
 * Función onClick encargada de llamar a la función de la clase PlayerAPI encargada de realizar el ataque de un Jugador.
 * @param d - Dirección donde va dirigido el ataque
 */
function onClickAttack(d) {
    playerAPI.attackPlayer(playerAPI.getToken, d, function (response, status) {
        addTextToConsole(response);

        if (status === 200) {

        }
    })
}

/**
 * Función onClick encargada de llamar a la función de la clase PlayerAPI encargada de realizar el movimiento de un Jugador.
 * @param d - Dirección donde moverse
 */
function onClickMove(d) {
    playerAPI.movePlayer(playerAPI.getToken, d, function (response, status) {
        addTextToConsole(response);

        if (status === 200) {

        }
    })
}


function getNearPlayers() {
    playerAPI.getNearPlayers(playerAPI.getToken, function (response, status, object) {
        addTextToConsole(response);

        if (status === 200) {

        }
    })
}

function getMapInfo() {
    playerAPI.getMapInfo(function (response, status, object) {
        addTextToConsole(response);

        if (status === 200) {
            // console.log(object);
            console.log(object.length);

            for (let i = 0; i < object.length; i++) {
                let x = object[i][0];
                let y = object[i][1];
                map.setBoolCell(x, y, true);
                let node = map.getDomCell(x, y);
                node.style.backgroundColor = "#ec2d42";
            }
            let playerX = player.getX;
            let playerY = player.getY;
            let playerD = player.getD;

            let playerNode = map.getDomCell(playerX, playerY);
            playerNode.style.backgroundColor = "blue";

            //TODO: Añadir la imagen de la direccion donde mira el usuario!
            let test = map.getDomCell(playerX, playerY);
            test.style.backgroundImage = "url('../images/player-dir.png')";

            console.log(map.getBoolMatrix);
        }
    })
}