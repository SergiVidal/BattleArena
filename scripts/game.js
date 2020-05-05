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
    initMap();

}


/** Inicializa los componentes de la UI **/
function initUI() {
    addTextToConsole("Bienvenido a Battle Arena! (Desarrollado por <b>Sergi Vidal</b>)");

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
                    getNearPlayers();
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
                    initMap();
                    getMapInfo();
                    getNearPlayers();
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
            initMap();
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
 * Función encargada de inicializar el mapa
 */
function initMap() {

    map = new Map();
    map.initBoolMatrix();
    map.initDomMatrix();
    createMap();
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

    while (mapUI.firstChild) {
        mapUI.removeChild(mapUI.lastChild);
    }

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

function initCornerVisors() {
    let floorImg = "url('images/floor.png')";
    let wallImg = "url('images/wall.png')";

    //Top Visors
    let nwVisor = document.getElementById('nw-visor');
    setEnemyImage(nwVisor, floorImg);

    let nVisor = document.getElementById('n-visor');
    setEnemyImage(nVisor, floorImg);

    let neVisor = document.getElementById('ne-visor');
    setEnemyImage(neVisor, floorImg);

    //Center Visors
    let mwVisor = document.getElementById('mw-visor');
    setEnemyImage(mwVisor, floorImg);

    let mVisor = document.getElementById('m-visor');
    setEnemyImage(mVisor, floorImg);

    let meVisor = document.getElementById('me-visor');
    setEnemyImage(meVisor, floorImg);

    //Bottom Visors
    let swVisor = document.getElementById('sw-visor');
    setEnemyImage(swVisor, floorImg);

    let sVisor = document.getElementById('s-visor');
    setEnemyImage(sVisor, floorImg);

    let seVisor = document.getElementById('se-visor');
    setEnemyImage(seVisor, floorImg);

    let x = player.getX;
    let y = player.getY;

    //NORTH
    if (x === 0) {
        setEnemyImage(nVisor, wallImg);
    }

    //EAST
    if (y === 0) {
        setEnemyImage(mwVisor, wallImg);
    }

    //WEST
    if ((y + 1) === COLUMNS) {
        setEnemyImage(meVisor, wallImg);
    }

    //South
    if ((x + 1) === ROWS) {
        setEnemyImage(sVisor, wallImg);
    }

    //Esquina superior izquierda
    if (x === 0 && y === 0) {
        setEnemyImage(nwVisor, wallImg);
        setEnemyImage(neVisor, wallImg);
        setEnemyImage(swVisor, wallImg);

    }

    //Esquina superior derecha
    if (x === 0 && (y + 1) === COLUMNS) {
        setEnemyImage(neVisor, wallImg);
        setEnemyImage(nwVisor, wallImg);
        setEnemyImage(seVisor, wallImg);

    }

    //Esquina inferior izquierda
    if ((x + 1) === ROWS && y === 0) {
        setEnemyImage(swVisor, wallImg);
        setEnemyImage(nwVisor, wallImg);
        setEnemyImage(seVisor, wallImg);

    }

    //Esquina inferior derecha
    if ((x + 1) === ROWS && (y + 1) === COLUMNS) {
        setEnemyImage(seVisor, wallImg);
        setEnemyImage(neVisor, wallImg);
        setEnemyImage(swVisor, wallImg);

    }
}

function updateVisor(enemy) {

    let wallImg = "url('images/wall.png')";
    let floorImg = "url('images/floor.png')";

    let enemyImg = "url('images/enemy.png')";

    //Top Visors
    let nwVisor = document.getElementById('nw-visor');
    let nVisor = document.getElementById('n-visor');
    let neVisor = document.getElementById('ne-visor');

    //Center Visors
    let mwVisor = document.getElementById('mw-visor');
    let mVisor = document.getElementById('m-visor');
    let meVisor = document.getElementById('me-visor');

    //Bottom Visors
    let swVisor = document.getElementById('sw-visor');
    let sVisor = document.getElementById('s-visor');
    let seVisor = document.getElementById('se-visor');

    // for (let i = 0; i < object.length; i++) {
    // if(player.getName() !== object[i].getName()){
    // let enemy = new Player(object[i]);
    if (player.getName !== enemy.getName) {

        console.log("near:");
        console.log(enemy);
        setEnemyImage(seVisor, floorImg);

        //TODO: Solo entra en 1 y el resto no (sin else if)
        if (player.getD === 'N') {


            if (enemy.getX === (player.getX - 1) && enemy.getY === (player.getY - 1)) { // -1 -1
                setEnemyImage(nwVisor, enemyImg);
            } else if (enemy.getX === (player.getX - 1) && enemy.getY === player.getY) { // -1 0
                setEnemyImage(nVisor, enemyImg);

            } else if (enemy.getX === (player.getX - 1) && enemy.getY === (player.getY + 1)) { //-1 +1
                setEnemyImage(neVisor, enemyImg);

            } else if (enemy.getX === player.getX && enemy.getY === (player.getY - 1)) { // 0 -1
                setEnemyImage(mwVisor, enemyImg);

            } else if (enemy.getX === player.getX && enemy.getY === player.getY) { // 0 0
                setEnemyImage(mVisor, enemyImg);

            } else if (enemy.getX === player.getX && enemy.getY === (player.getY + 1)) { // 0 +1
                setEnemyImage(meVisor, enemyImg);

            } else if (enemy.getX === (player.getX + 1) && enemy.getY === (player.getY - 1)) { // +1 -1
                setEnemyImage(swVisor, enemyImg);

            } else if (enemy.getX === (player.getX + 1) && enemy.getY === player.getY) { // +1 0
                setEnemyImage(sVisor, enemyImg);

            } else if (enemy.getX === (player.getX + 1) && enemy.getY === (player.getY + 1)) { // + 1 +1
                setEnemyImage(seVisor, enemyImg);
            }
        } else if (player.getD === 'W') {

        } else if (player.getD === 'E') {

        } else {

        }


        // }
    }
}

function setEnemyImage(node, image) {
    node.style.backgroundImage = image;
    node.style.backgroundSize = "135px";
    node.style.backgroundRepeat = "no-repeat";
}

/**
 * Función encargada de llamar a la función de la clase PlayerAPI encargada de obtener los enemigos cercados
 */
function getNearPlayers() {
    playerAPI.getNearPlayers(playerAPI.getToken, function (response, status, object) {
        addTextToConsole(response);
        if (status === 200) {
            console.log("length:");
            console.log(object.length);

            console.log("myPos: ");
            console.log(player.getX + " - " + player.getY);

            initCornerVisors();
            for (let i = 0; i < object.length; i++) {
                let enemy = new Player(object[i]);
                // updateVisor(enemy);
            }
            // document.getElementById('nw-visor').style.backgroundImage = "url('images/enemy.png')";
        }
    })
}

/**
 * Función encargada de llamar a la función de la clase PlayerAPI encargada de obtener la información del mapa y de actualizarlo
 */
function getMapInfo() {
    playerAPI.getMapInfo(function (response, status, object) {
        addTextToConsole(response);

        if (status === 200) {
            // console.log(object);
            // console.log(object.length);

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
            test.style.backgroundImage = "url('images/player-dir.png')";
            test.style.backgroundSize = "20px";
            test.style.backgroundRepeat = "no-repeat";
            if (playerD === "E") {
                test.style.transform = "rotate(90deg)";
            } else if (playerD === "S") {
                test.style.transform = "rotate(180deg)";
            } else if (playerD === "O") {
                test.style.transform = "rotate(-90deg)";
            }
            // background-size: 20px;
            // background-repeat: no-repeat;
            // console.log(map.getBoolMatrix);
        }
    })
}

function refreshGame() {

}