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
 * Se encarga de hacer aparecer el ranking
 */
function openRanking() {
    document.getElementsByClassName("ranking-popup")[0].style.display = "block";
}

/**
 * Se encarga de hacer desaparecer el ranking
 */
function closeRanking() {
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

                    console.log("Direction:");
                    console.log(player.getD);
                    console.log(player.getX +"-"+player.getY);
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
    closeRanking();
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
    closeRanking();
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
            restartVisor();
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
            let ranking = document.getElementById("ranking-content");
            while (ranking.firstChild) {
                ranking.removeChild(ranking.lastChild);
            }
            createH3Element(object, ranking);
            // for(let i = 0; i < object.length; i++)

            openRanking();
            console.log(typeof object);
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

function restartVisor() {
    //Top Visors
    document.querySelectorAll('.view').forEach(function (element) {
        element.style.backgroundImage = "none";
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
//TODO: Comprobar bug, la direccion a la que se mueve el jugador no concuerda!
/**
 * Función onClick encargada de llamar a la función de la clase PlayerAPI encargada de realizar el movimiento de un Jugador.
 * @param d - Dirección donde moverse
 */
function onClickMove(d) {
    playerAPI.movePlayer(playerAPI.getToken, d, function (response, status) {
        addTextToConsole(response);

        if (status === 200) {

            playerAPI.getCurrentPlayerInfo(playerAPI.getToken, function (response, status, object) {
                addTextToConsole(response);

                if (status === 200) {
                    console.log("Before");
                    console.log(player);
                    player = new Player(object);
                    console.log("After");
                    console.log(player);

                    updateViewWithPlayerInfo();
                    initMap();
                    getMapInfo();
                    getNearPlayers();
                }
            });
        }
    })
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

    let verticalAxis = player.getX;//x
    let horizontalAxis = player.getY; //y

    //TODO: Paredes Ok

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
    //TODO: Esquinas OK

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
    if (player.getName !== enemy.getName && enemy.getVp !== 0) {
        console.log(enemy.getVp);
        // let wallImg = "url('images/wall.png')";
        // let floorImg = "url('images/floor.png')";

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
        } else if (verticalAxis === (player.getY -1) && horizontalAxis=== player.getX) { // N
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
 * Función encargada de llamar a la función de la clase PlayerAPI encargada de obtener los enemigos cercados
 */
function getNearPlayers() {
    playerAPI.getNearPlayers(playerAPI.getToken, function (response, status, object) {
        addTextToConsole(response);
        if (status === 200) {
            initCornerVisors();
            for (let i = 0; i < object.length; i++) {
                let enemy = new Player(object[i]);
                updateVisor(enemy);
            }
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
            for (let i = 0; i < object.length; i++) {
                let verticalAxis = object[i][0];
                let horizontalAxis = object[i][1];
                map.setBoolCell(horizontalAxis, verticalAxis, true);
                let node = map.getDomCell(horizontalAxis, verticalAxis);
                node.style.backgroundColor = "#ec2d42";
            }
            let verticalAxis = player.getX;
            let horizontalAxis = player.getY;
            let playerD = player.getD;

            let playerNode = map.getDomCell(horizontalAxis, verticalAxis);
            playerNode.style.backgroundColor = "blue";

            let test = map.getDomCell(horizontalAxis, verticalAxis);
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
        }
    })
}

function refreshGame() {

}

//TODO: Hay que modificar las funciones que hagan 2 llamadas seguidas a la API y unir las 2 llamadas a una Promise?
