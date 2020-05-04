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
    map.init();
}


/** Inicializa los componentes de la UI **/
function initUI() {
    addTextToConsole("Bienvenido a Battle Arena! (Desarrollado por <b>Sergi Vidal</b>)");

    createMap();
    blockRevivePlayerButton();
    blockDeletePlayerButton();
    initCreatePlayerForm();
    initPlayersControls();
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
function initCreatePlayerForm() {
    closeCreatePlayerForm();
    document.getElementById('btn-close-create-player').addEventListener("click", closeCreatePlayerForm);
    document.getElementById('form-create-player').addEventListener("click", onClickCreateNewPlayer);

    document.getElementById('new-player').addEventListener("click", openCreatePlayerFrom);
    document.getElementById('revive-player').addEventListener("click", onClickRevivePlayer);
    document.getElementById('delete-player').addEventListener("click", onClickDeletePlayer);
}

/**
 * Función onClick del botón Crear un nuevo jugador, se encarga de gestionar las fuciones encargadas de crear el jugador y de obtener su información mediante llamadas a la API
 */
function onClickCreateNewPlayer() {
    let playerName = document.getElementById('input-player-name').value;
    closeCreatePlayerForm();
    playerAPI.createNewPlayer(playerName, function (token) {
        console.log(token);
        playerAPI.setToken(token);
        playerAPI.getCurrentPlayerInfo(playerAPI.getToken, function (object) {
            player = new Player(object);
            addTextToConsole("Has creado un nuevo jugador! En la parte superior derecha verás sus estadisticas!");
            updateViewWithPlayerInfo();

            blockCreatePlayerButton();
            enableRevivePlayerButton();
            enableDeletePlayerButton();
        })
    });

}

/**
 * Función onClick del botón Revivir el jugador actual, se encarga de gestionar las fuciones encargadas de revivir el jugador y de obtener su información mediante llamadas a la API
 */
function onClickRevivePlayer() {
    playerAPI.respawnCurrentPlayer(playerAPI.getToken, function () {
        addTextToConsole("El jugador ha sido actualizado correctamente!");

        playerAPI.getCurrentPlayerInfo(playerAPI.getToken, function (object) {
            player = new Player(object);
            addTextToConsole("En la parte superior derecha verás sus estadisticas!");
            updateViewWithPlayerInfo();
        });
    });
}

/**
 * Función onClick del botón Eliminar el jugador actual, se encarga de gestionar las fuciones encargadas de eliminar el jugador mediante una llamada a la API
 */
function onClickDeletePlayer() {
    playerAPI.deleteCurrentPlayer(playerAPI.getToken, function () {
        addTextToConsole("El jugador ha sido eliminado correctamente!");

        player = null;
        updateViewWithPlayerInfo();
        enableCreatePlayerButton();
        blockRevivePlayerButton();
        blockDeletePlayerButton();
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
    let map = document.getElementById('map');

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            let node = document.createElement("DIV");
            node.setAttribute("class", "cell");
            map.appendChild(node);

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
    document.getElementById('move-west').addEventListener("click", function (){
        onClickMove("O")
    });
    document.getElementById('move-east').addEventListener("click", function (){
        onClickMove("E")
    });
    document.getElementById('move-south').addEventListener("click", function (){
        onClickMove("S")
    });
}

/**
 * Función onClick encargada de llamar a la función de la clase PlayerAPI encargada de realizar el ataque de un Jugador.
 * @param d - Dirección donde va dirigido el ataque
 */
function onClickAttack(d) {
    playerAPI.attackPlayer(playerAPI.getToken, d, function () {

    })
}

/**
 * Función onClick encargada de llamar a la función de la clase PlayerAPI encargada de realizar el movimiento de un Jugador.
 * @param d - Dirección donde moverse
 */
function onClickMove(d) {
    playerAPI.movePlayer(playerAPI.getToken, d, function () {

    })
}
