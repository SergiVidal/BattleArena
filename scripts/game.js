/** @type {Player} */
let player;

/** @type {PlayerAPI} */
let playerAPI;

/** @type {Map} */
let map;

/** @type {Boolean} */
let isGameOn;

/** Esta función es la primera que se llama cuando la aplicacion es iniciada **/
window.onload = function () {
    initGame();
};

/** Se encarga de inicializar el juego junto a sus componentes**/
function initGame() {
    playerAPI = new PlayerAPI();
    initMap();
    initUI();
    isGameOn = false;
}


/** Inicializa los componentes de la UI (Botones y sus eventos) **/
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
 * Se encarga de hacer aparecer el ranking
 */
function openRanking() {
    blockRankingButton();
    document.getElementsByClassName("ranking-popup")[0].style.display = "block";
}

/**
 * Se encarga de hacer desaparecer el ranking
 */
function closeRanking() {
    enableRankingButton();
    document.getElementsByClassName("ranking-popup")[0].style.display = "none";
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
    document.getElementById('btn-close-ranking').addEventListener("click", closeRanking);

    initPlayersControls();
}

function getVpPercentage() {
    return Math.round((player.getVp / Player.prototype.maxVp) * 100);
}

/**
 * Función onClick del botón: Crear un nuevo jugador, se encarga de gestionar las fuciones de crear el jugador y de obtener su información mediante llamadas a la API
 */
function onClickCreateNewPlayer() {
    let playerName = document.getElementById('input-player-name').value;
    if (playerName.length > 0 && playerName.startsWith(" ") !== true) {
        closeCreatePlayerForm();
        playerAPI.createNewPlayer(playerName, function (token) {
            console.log(token);
            playerAPI.setToken(token);

            playerAPI.getCurrentPlayerInfo(playerAPI.getToken, function (object) {
                player = new Player(object);
                Player.prototype.maxVp = player.getVp;
                updateViewWithPlayerInfo();
                blockCreatePlayerButton();
                enableRevivePlayerButton();
                enableDeletePlayerButton();
                enableRankingButton();
                enableControlButtons();
                getMapInfo();
                getNearPlayers();
                isGameOn = true;
                refreshGame();
            })
        });
    } else {
        addTextToConsole("El nombre del jugador no debe estar vacio ni empezar por un espacio!");
    }
}

/**
 * Encargada de llamar a la función que realiza una llamada a la API para obtener los datos del jugador
 */
function getPlayerInfo() {
    playerAPI.getCurrentPlayerInfo(playerAPI.getToken, function (object) {
        resetOldPlayerPosition();
        player = new Player(object);
        updateViewWithPlayerInfo();
        getMapInfo();
        getNearPlayers();
    });
}

/**
 * Función encargada de resetear la posición del jugador anterior a realizar un movimiento
 */
function resetOldPlayerPosition() {
    let verticalAxis = player.getX;
    let horizontalAxis = player.getY;

    map.getBoolMatrix[horizontalAxis][verticalAxis] = false;
    map.getDomMatrix[horizontalAxis][verticalAxis].style.backgroundColor = "white";
    map.getDomMatrix[horizontalAxis][verticalAxis].style.backgroundImage = "none";
}

/**
 * Función onClick del botón: Revivir el jugador actual, se encarga de gestionar las fuciones de revivir el jugador y de obtener su nueva información mediante llamadas a la API
 */
function onClickRevivePlayer() {
    closeRanking();
    playerAPI.respawnCurrentPlayer(playerAPI.getToken, function () {
        getPlayerInfo();
    });
}

/**
 * Función onClick del botón: Eliminar el jugador actual, se encarga de gestionar la fucion de eliminar el jugador mediante una llamada a la API, además de resetear la UI
 */
function onClickDeletePlayer() {
    closeRanking();
    playerAPI.deleteCurrentPlayer(playerAPI.getToken, function () {
        player = null;
        updateViewWithPlayerInfo();
        enableCreatePlayerButton();
        blockRevivePlayerButton();
        blockDeletePlayerButton();
        blockRankingButton();
        blockControlButtons();
        initMap();
        restartVisor();
        isGameOn = false;
    });
}

/**
 * Función onClick del botón: Mostrar Ranking, se encarga de gestionar las fuciones de Mostrar el Ranking mediante una llamada a la API
 * Además se encarga de tratar los datos devueltos del servidor y modificar su formato mediante splits de (\n) y (,)
 */
function onClickShowRanking() {
    playerAPI.showRanking(function (object) {
        let ranking = document.getElementById("ranking-list");
        while (ranking.firstChild) {
            ranking.removeChild(ranking.lastChild);
        }

        let linesArr = object.split('\n');
        for (let i = 0; i < linesArr.length - 1; i++) {
            let playerArr = linesArr[i].split(',');
            createElement(playerArr[0] + " => " + playerArr[1], ranking, "LI");
        }
        openRanking();
    });
}

/**
 * Función encargada de inicializar y crear el mapa
 */
function initMap() {
    map = new Map();
    map.initBoolMatrix();
    map.initDomMatrix();
    createMap();
}

/**
 * Función encargada de reiniciar el visor
 */
function restartVisor() {
    document.querySelectorAll('.view').forEach(function (element) {
        element.style.backgroundImage = "none";
    });
}

/**
 * Función encargada de actualizar la informació del usuario en el HTMl - Player Stats
 */
function updateViewWithPlayerInfo() {
    let playerStats = document.getElementById('stats');
    playerStats.innerHTML = "";
    if (player !== null) {
        document.getElementById('player-image').src = player.getImg;
        createElement("Name: " + player.name, playerStats, "H3");
        createElement("Attack: " + player.attack, playerStats, "H3");
        createElement("Defense: " + player.defense, playerStats, "H3");
        createElement("", playerStats, "H3");
        if(player.getVp > 0 ) {
            playerStats.lastChild.innerHTML = "Vitality Points: " + player.getVp + " (" + getVpPercentage() + "%)";
        }else{
            playerStats.lastChild.innerHTML = "Vitality Points: 0 (0%)";

        }
        // document.getElementById("myList").lastChild.innerHTML;
    } else {
        document.getElementById('player-image').src = "images/skull.png";
        createElement("Name: -", playerStats, "H3");
        createElement("Attack: -", playerStats, "H3");
        createElement("Defense: -", playerStats, "H3");
        createElement("Vitality Points: -", playerStats, "H3");
    }

}

/**
 * Función encargada de crear un nuevo elemento HTML y añadirlo dentro de otro
 * @param data - Texto/Información que contendrá el nuevo nodo/tag (childNode)
 * @param parentNode - Elemento HTML que en su interior contendrá el nuevo elemento (tag)
 * @param childNode - Tipo de elemento nuevo (tag)
 */
function createElement(data, parentNode, childNode) {
    let node = document.createElement(childNode);
    let textNode = document.createTextNode(data);
    node.appendChild(textNode);
    parentNode.appendChild(node);
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

/**
 * Función encargada de añadir logs a la consola
 * @param text - Información a añadir
 */
function addTextToConsole(text) {
    let console = document.getElementById('console');
    console.innerHTML = "[" + getTime() + "]: " + text + "</br>" + console.innerHTML;
}

/**
 * Se encarga de crear el Map segun las filas y columnas definidas por defecto
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

    document.getElementById('move-northWest').addEventListener("click", function () {
        onClickDiagonalMove("N", "O");
    });

    document.getElementById('move-north').addEventListener("click", function () {
        onClickMove("N")
    });

    document.getElementById('move-northEast').addEventListener("click", function () {
        onClickDiagonalMove("N", "E");
    });

    document.getElementById('move-west').addEventListener("click", function () {
        onClickMove("O")
    });
    document.getElementById('move-east').addEventListener("click", function () {
        onClickMove("E")
    });

    document.getElementById('move-southWest').addEventListener("click", function () {
        onClickDiagonalMove("S", "O");
    });

    document.getElementById('move-south').addEventListener("click", function () {
        onClickMove("S")
    });

    document.getElementById('move-southEast').addEventListener("click", function () {
        onClickDiagonalMove("S", "E");
    });
}

/**
 * Función encargada de bloquear los controles del Jugador
 */
function blockControlButtons() {
    document.querySelectorAll('.box').forEach(function (element) {
        element.style.pointerEvents = "none";
        element.style.opacity = "0.7";
    });
}

/**
 * Función encargada de desbloquear los controles del Jugador
 */
function enableControlButtons() {
    document.querySelectorAll('.box').forEach(function (element) {
        element.style.pointerEvents = "auto";
        element.style.opacity = "1";
        element.style.backgroundColor = "white";
    });
}

/**
 * Función onClick del botón: Atacar a un Jugador enemigo, se encarga de gestionar la función de Atacar mediante una llamada a la API
 * Bloquea los controles del jugador hasta haber terminado la llamada, esto provoca un efecto visual
 * @param d - Dirección donde va dirigido el ataque
 */
function onClickAttack(d) {
    blockControlButtons();
    playerAPI.attackPlayer(playerAPI.getToken, d, function () {
//TODO: Hago algo mas?
    });
}

/**
 * Función onClick del botón: Mover al Jugador, se encarga de gestionar la función de Mover mediante una llamada a la API
 * Bloquea los controles del jugador hasta haber terminado la llamada, esto provoca un efecto visual
 * @param d - Dirección donde moverse
 */
function onClickMove(d) {
    blockControlButtons();
    playerAPI.movePlayer(playerAPI.getToken, d, function () {
        getPlayerInfo();

    });
}

function onClickDiagonalMove(d1, d2) {
    blockControlButtons();
    playerAPI.movePlayer(playerAPI.getToken, d1, function () {
        getPlayerInfo();

        setTimeout(function () {
            playerAPI.movePlayer(playerAPI.getToken, d2, function () {
                getPlayerInfo();

            });
        }, 1000);

    });
}


/**
 * Función encargada de inicializar los visores laterales (si el jugador se encuentra en una pared o esquina)
 */
function initCornerVisors() {
    let floorImg = "url('images/floor.png')";
    let wallImg = "url('images/wall.png')";

    //Top Visors
    let nwVisor = document.getElementById('nw-visor');
    setVisorImage(nwVisor, floorImg);

    let nVisor = document.getElementById('n-visor');
    setVisorImage(nVisor, floorImg);

    let neVisor = document.getElementById('ne-visor');
    setVisorImage(neVisor, floorImg);

    //Center Visors
    let mwVisor = document.getElementById('mw-visor');
    setVisorImage(mwVisor, floorImg);

    let mVisor = document.getElementById('m-visor');
    setVisorImage(mVisor, floorImg);

    let meVisor = document.getElementById('me-visor');
    setVisorImage(meVisor, floorImg);

    //Bottom Visors
    let swVisor = document.getElementById('sw-visor');
    setVisorImage(swVisor, floorImg);

    let sVisor = document.getElementById('s-visor');
    setVisorImage(sVisor, floorImg);

    let seVisor = document.getElementById('se-visor');
    setVisorImage(seVisor, floorImg);

    let verticalAxis = player.getX;
    let horizontalAxis = player.getY;

    //Pared de arriba
    if (horizontalAxis === 0) {
        setVisorImage(nVisor, wallImg);
        setVisorImage(nwVisor, wallImg);
        setVisorImage(neVisor, wallImg);

    }

    //Pared de la izquierda
    if (verticalAxis === 0) {
        setVisorImage(mwVisor, wallImg);
        setVisorImage(nwVisor, wallImg);
        setVisorImage(swVisor, wallImg);

    }

    //Pared de la derecha
    if ((verticalAxis + 1) === COLUMNS) {
        setVisorImage(meVisor, wallImg);
        setVisorImage(neVisor, wallImg);
        setVisorImage(seVisor, wallImg);

    }

    //Pared de abajo
    if ((horizontalAxis + 1) === ROWS) {
        setVisorImage(sVisor, wallImg);
        setVisorImage(swVisor, wallImg);
        setVisorImage(seVisor, wallImg);

    }

    //Esquina superior izquierda
    if (horizontalAxis === 0 && verticalAxis === 0) {
        setVisorImage(nwVisor, wallImg);
        setVisorImage(neVisor, wallImg);
        setVisorImage(swVisor, wallImg);

    }

    //Esquina superior derecha
    if (horizontalAxis === 0 && (verticalAxis + 1) === COLUMNS) {
        setVisorImage(neVisor, wallImg);
        setVisorImage(nwVisor, wallImg);
        setVisorImage(seVisor, wallImg);

    }

    //Esquina inferior izquierda
    if ((horizontalAxis + 1) === ROWS && verticalAxis === 0) {
        setVisorImage(swVisor, wallImg);
        setVisorImage(nwVisor, wallImg);
        setVisorImage(seVisor, wallImg);

    }

    //Esquina inferior derecha
    if ((horizontalAxis + 1) === ROWS && (verticalAxis + 1) === COLUMNS) {
        setVisorImage(seVisor, wallImg);
        setVisorImage(neVisor, wallImg);
        setVisorImage(swVisor, wallImg);

    }
}

/**
 * Función encargada de actualizar el visor según los enemigos colindantes
 * @param enemy - Enemigo colindante
 */
function updateVisor(enemy) {
    if (player.getName !== enemy.getName && enemy.getVp > 0) {
         let enemyImg = "url('images/enemy.png')";

        let horizontalAxis = enemy.getX;
        let verticalAxis = enemy.getY;

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


        if (verticalAxis === (player.getY - 1) && horizontalAxis === (player.getX - 1)) { // NW
            setVisorImage(nwVisor, enemyImg);
        } else if (verticalAxis === (player.getY - 1) && horizontalAxis === player.getX) { // N
            setVisorImage(nVisor, enemyImg);

        } else if (verticalAxis === (player.getY - 1) && horizontalAxis === (player.getX + 1)) { //NE
            setVisorImage(neVisor, enemyImg);

        } else if (verticalAxis === player.getY && horizontalAxis === (player.getX - 1)) { // W
            setVisorImage(mwVisor, enemyImg);

        } else if (verticalAxis === player.getY && horizontalAxis === player.getX) { // Esta en tu posicion
            setVisorImage(mVisor, enemyImg);

        } else if (verticalAxis === player.getY && horizontalAxis === (player.getX + 1)) { // E
            setVisorImage(meVisor, enemyImg);

        } else if (verticalAxis === (player.getY + 1) && horizontalAxis === (player.getX - 1)) { // SW
            setVisorImage(swVisor, enemyImg);

        } else if (verticalAxis === (player.getY + 1) && horizontalAxis === player.getX) { // S
            setVisorImage(sVisor, enemyImg);

        } else if (verticalAxis === (player.getY + 1) && horizontalAxis === (player.getX + 1)) { // SE
            setVisorImage(seVisor, enemyImg);
        }
    }
}

/**
 * Función encargada de modificar la imagen del visor
 * @param node - Visor a modificar
 * @param image - URL de la imagen
 */
function setVisorImage(node, image) {
    node.style.backgroundImage = image;
    node.style.backgroundSize = "135px";
    node.style.backgroundRepeat = "no-repeat";
}

/**
 * Llama a la función de la clase PlayerAPI encargada de obtener los enemigos cercados
 */
function getNearPlayers() {
    playerAPI.getNearPlayers(playerAPI.getToken, function (object) {
        initCornerVisors();
        for (let i = 0; i < object.length; i++) {
            let enemy = new Player(object[i]);
            updateVisor(enemy);
        }
    })
}

/**
 * Función encargada de resetear el background del minimapa a color blanco
 */
function resetOldMapInfo() {
    for (let i = 0; i < map.getDomMatrix.length; i++) {
        for (let j = 0; j < map.getDomMatrix[i].length; j++) {
            map.getDomMatrix[i][j].style.backgroundColor = "white";
        }
    }
}

/**
 * Llamar a la función de la clase PlayerAPI encargada de obtener la información del mapa y de actualizarlo (tanto visual como lógicamente)
 * Si se encuentran enemigos en el mapa, la casilla correspondiente se pintará en rojo
 * La casilla donde se encuentre el jugador se pintará en azul,
 * además de mostrar la dirección a la que esta mirando mediante una flecha (rotando la imagen según necesidades)
 */
function getMapInfo() {
    playerAPI.getMapInfo(function (object) {
        resetOldMapInfo();
        // resetOldPlayerPosition();
        for (let i = 0; i < object.length; i++) {
            let verticalAxis = object[i][0];
            let horizontalAxis = object[i][1];
            map.setBoolCell(horizontalAxis, verticalAxis, true);
            let node = map.getDomCell(horizontalAxis, verticalAxis);
            node.style.backgroundImage = "none";
            node.style.backgroundColor = "#ec2d42"; //TODO: Me sigue pintando los enemigos muertos ya que getMapInfo solo devuelve sus coordenadas!
        }
        let verticalAxis = player.getX;
        let horizontalAxis = player.getY;
        let playerD = player.getD;

        let playerNode = map.getDomCell(horizontalAxis, verticalAxis);
        playerNode.style.backgroundColor = "blue";

        let playerCell = map.getDomCell(horizontalAxis, verticalAxis);
        playerCell.style.backgroundImage = "url('images/player-dir.png')";
        playerCell.style.backgroundSize = "15px";
        playerCell.style.backgroundRepeat = "no-repeat";
        playerCell.style.backgroundPosition = "center";
        if (playerD === "E") {
            playerCell.style.transform = "rotate(90deg)";
        } else if (playerD === "S") {
            playerCell.style.transform = "rotate(180deg)";
        } else if (playerD === "O") {
            playerCell.style.transform = "rotate(-90deg)";
        } else{
            playerCell.style.transform = "rotate(0)"
        }
    })
}

/**
 * Función encargada de refrescar el juego continuamente con un timeout, siempre y cuando haya un Jugador creado.
 */
function refreshGame() {
    if (isGameOn) {
        setTimeout(playerAPI.fetchRefreshGame, 2000);
    }
}

//TODO: Añadir porcentajes a la vida, añadir cantidad de enemigos muertos en las estadisticas
//TODO: Añadir animacions y efectos (visuales y/o sonoros)
//TODO: Añadir al minimapa informacion aumentada (colores distintos segun puntos de vida... )
//TODO: Hay un visor que muestra todos lo elementos, información de las APIs, información transformada  (porcentages…) o múltiples visores.
//TODO: Al Atacar > intentar calcular el daño realizado y recibido
//TODO: Añadir nuevos movimientos (huida: 2 pasos a la vez, ir en diagonal: 2 pasos a la vez...)