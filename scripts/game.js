let player;


/** OnLoad, esta función es la primera que se llama cuando la aplicacion es iniciada **/
window.onload = function () {
    // var token = createNewPlayer("test0007");
    // console.log(token)
    initGame();
};

/** Initialize game**/
function initGame() {
    initUI();
    initObjects();
}

/** Initialize objects and variables **/
function initUI() {
    addTextToConsole("Bienvenido a Battle Arena! (Desarrollado por <b>Sergi Vidal</b>)");

    createMap();
    blockReviveDeletePlayerButtons();
    initCreatePlayerForm();
}

/** Initialize objects and variables **/
function initObjects() {
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
    document.getElementById('new-player').addEventListener("click", openCreatePlayerFrom);
    document.getElementById('btn-close-create-player').addEventListener("click", closeCreatePlayerForm);
    document.getElementById('form-create-player').addEventListener("click", onClickCreateNewPlayer);
}

/**
 * A partir del nombre de usuario, se encarga de llamar a las fuciones encargadas de crear el jugador y de obtener su información
 */
function onClickCreateNewPlayer() {
    var playerName = document.getElementById('input-player-name').value;
    closeCreatePlayerForm();
    createNewPlayer(playerName, function (token) {
        console.log(token);
        getCurrentPlayerInfo(token, function (object) {
            player = new Player(object);
            addTextToConsole("Has creado un nuevo jugador! En la parte superior derecha verás sus estadisticas!");
            updateViewWithPlayerInfo();
            enableReviveDeletePlayerButtons();
        })
    });

}

/**
 * Función encargada de actualizar informació del usuario en el HTMl
 */
function updateViewWithPlayerInfo() {
    let playerStats = document.getElementById('stats');
    playerStats.innerHTML = "";
    createH3Element("Name: " + player.name, playerStats);
    createH3Element("Attack: " + player.attack, playerStats);
    createH3Element("Defense: " + player.defense, playerStats);
    createH3Element("Vitality Points: " + player.vp, playerStats);

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
 * Función encargada de bloquear los botones de revivir y eliminar usuario cuando aun no estan creados
 */
function blockReviveDeletePlayerButtons() {
    let reviveBtn = document.getElementById('revive-player');
    reviveBtn.style.pointerEvents = "none";
    reviveBtn.style.backgroundColor = "grey";

    let deleteBtn = document.getElementById('delete-player');
    deleteBtn.style.pointerEvents = "none";
    deleteBtn.style.backgroundColor = "grey";

}

/**
 * Función encargada de desbloquear los botones de revivir y eliminar usuario
 */
function enableReviveDeletePlayerButtons() {
    let reviveBtn = document.getElementById('revive-player');
    reviveBtn.style.pointerEvents = "auto";
    reviveBtn.style.backgroundColor = "#ec2d42";

    let deleteBtn = document.getElementById('delete-player');
    deleteBtn.style.pointerEvents = "auto";
    deleteBtn.style.backgroundColor = "#ec2d42";
}

//TODO: preguntar como hacer la consola, su tipo de tag y que contenga un scroll!
function addTextToConsole(text) {
    let console = document.getElementById('console');
    console.innerHTML = console.innerHTML + text + "</br>";
}

function createMap() {
    let map = document.getElementById('map');


    for (let i = 0; i < ROWS; i ++){
        for(let j = 0; j < COLUMNS; j++){
            let node = document.createElement("DIV");
            node.setAttribute("class", "cell");
            map.appendChild(node);

        }
    }
}