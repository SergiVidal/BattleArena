/**
 * Representa una clase PlayerAPI donde gestionar todas las llamadas a la API.
 * Se comprueban y se tratan los códigos de respuesta:
 * Código 200: La llamada se ha realizado correctamente, por lo que se sigue el hilo de ejecución y se llama a la función Callback
 * Código 500: La llamada no se ha realizado satisfactoriamente, por lo que no se sigue el hilo de ejecución y no se llama a la función Callback
 * @constructor
 */

class PlayerAPI {
    constructor() {
        /**
         * @type {String}
         * */
        this.token = "";
    }

    /**
     * Función encargada de obtener el token del Jugador Actual
     * @returns {String} - Identificador único del Jugador Actual
     */
    get getToken() {
        return this.token;
    }

    /**
     * Función encargada de actualizar el token del Jugador Actual
     * @param token - Identificador único del Jugador Actual
     */
    setToken(token) {
        this.token = token;
    }

    /**
     * Funcion encargada de llamar a la API para crear un Nuevo Jugador
     * @param playerName - Nombre del usuario
     * @param callback - Función callback donde tratar la información de la API
     */
    createNewPlayer(playerName, callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                addTextToConsole("El jugador ha sido creado correctamente!");
                callback(this.responseText);
            } else {
                addTextToConsole("El nombre del Jugador ya ha sido utilizado!");
                console.log("El nombre del Jugador ya ha sido utilizado!");
            }
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/spawn/" + playerName);
    }

    /**
     * Funcion encargada de llamar a la API para actualizar el Jugador Actual
     * @param token - Identificqador único del Jugador Actual
     * @param callback - Función callback donde tratar la información de la API
     */
    respawnCurrentPlayer(token, callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                addTextToConsole("El jugador ha sido actualizado correctamente!");
                callback();
            } else {
                addTextToConsole("Ha ocurrido un error en el servidor al intentar actualizar el jugador!");
                console.log("Ha ocurrido un error en el servidor al intentar actualizar el jugador!");
            }
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/respawn/" + token);
    }

    /**
     * Funcion encargada de llamar a la API para eliminar el Jugador Actual
     * @param token - Identificqador único del Jugador Actual
     * @param callback - Función callback donde tratar la información de la API
     */
    deleteCurrentPlayer(token, callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                addTextToConsole ("El jugador ha sido eliminado correctamente!");
                callback();
            } else {
                addTextToConsole("Ha ocurrido un error en el servidor al intentar eliminar al jugador!");
                console.log("Ha ocurrido un error en el servidor al intentar eliminar al jugador!");
            }
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/remove/" + token);
    }

    /**
     * Funcion encargada de llamar a la API para obtener la información del Jugador Actual
     * @param token - Identificqador único del Jugador Actual
     * @param callback - Función callback donde tratar la información de la API
     */
    getCurrentPlayerInfo(token, callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback(JSON.parse(this.responseText));
            } else {
                addTextToConsole("Ha ocurrido un error en el servidor al intentar obtener la información del jugador!");
                console.log("Ha ocurrido un error en el servidor al intentar obtener la información del jugador!");
            }
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/player/" + token);
    }

    /**
     * Función encargada de mover el Jugador hacia una dirección
     * @param token - Identificqador único del Jugador Actual
     * @param d - Letra coincidente con la dirección objetivo (N,S,E,O)
     * @param callback - Función callback donde tratar la información de la API
     */
    movePlayer(token, d, callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                addTextToConsole("El Jugador se ha movido a la dirección: " + d);
                callback();
            } else {
                addTextToConsole("Te estas chocando contra una pared!");
                console.log("Te estas chocando contra una pared!");
            }
            enableControlButtons();
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/move/" + token + "/" + d);
    }

    /**
     * Función encargada de atacar a un Jugador/Enemigo hacia una dirección
     * @param token - Identificqador único del Jugador Actual
     * @param d - Letra coincidente con la dirección objetivo (N,S,E,O)
     * @param callback - Función callback donde tratar la información de la API
     */
    attackPlayer(token, d, callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                addTextToConsole("El Jugador ha atacado a la dirección: " + d);
                callback();
            } else {
                addTextToConsole("No hay ningún enemigo vivo en esta dirección!");
                console.log("No hay ningún enemigo vivo en esta dirección!");
            }
            enableControlButtons();
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/attack/" + token + "/" + d);
    }

    /**
     * Función encargada de obtener el Ranking de Jugadores
     * @param callback - Función callback donde tratar la información de la API
     */
    showRanking(callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                addTextToConsole("Se ha mostrado correctamente el Ranking");
                callback(this.responseText);
            } else {
                addTextToConsole("Ha ocurrido un error en el servidor al intentar obtener la información del ranking!");
                console.log("Ha ocurrido un error en el servidor al intentar obtener la información del ranking!");
            }
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/ranking");
    }

    /**
     * Funcion encargada de llamar a la API para obtener información detallada de los jugadores y enemigos localizados en celdas colindantes
     * @param token - Identificqador único del Jugador Actual
     * @param callback - Función callback donde tratar la información de la API
     */
    getNearPlayers(token, callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback(JSON.parse(this.responseText));
            } else {
                addTextToConsole("Ha ocurrido un error en el servidor al intentar obtener la información de los enemigos colindantes!");
                console.log("Ha ocurrido un error en el servidor al intentar obtener la información de los enemigos colindantes!");
            }
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/players/" + token);
    }

    /**
     * Funcion encargada de llamar a la API para obtener la información del mapa (localización de los enemigos)
     * @param callback - Función callback donde tratar la información de la API
     */
    getMapInfo(callback) {
        function reqListener() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback(JSON.parse(this.responseText));
            } else {
                addTextToConsole("Ha ocurrido un error en el servidor al intentar obtener la información del mapa!");
                console.log("Ha ocurrido un error en el servidor al intentar obtener la información del mapa!");
            }
        }

        var ajaxASYNC_GET = {
            request: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("load", reqListener);
                xhr.open("GET", url, true);
                xhr.send();
            }
        };

        ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/map");
    }

    /**
     * Función encargada de refrescar el juego, encadenando ciertas llamadas a la API
     * 1 - Obtener la información del jugador actual
     * 2 - Actualizar el jugador y sus estadísticas (HTML - Player Stats)
     * 3 - Obtener la información del mapa junto con la localización de los enemigos para actualizar el minimapa
     * 4 - Obtener la información de los enemigos colindantes para actualizar el visor
     * 5 - Llamar a la función refreshGame (game.js) para que siga refrescando cada 1 segundo el juego.
     */
    fetchRefreshGame() {
        fetch("http://puigpedros.salleurl.edu/pwi/arena/api/player/" + player.getToken) // (1)
            .then((response) => {
                return response.json();
            })
            .then((data) => { // (2)
                player = new Player(data);
                updateViewWithPlayerInfo();
            })
            .then(function () { // (3)
                getMapInfo();
            })
            .then(function () {// (4)
                getNearPlayers();
            }).then(function () {
            refreshGame(); // (5)
        }).catch((e) => {
            console.log("error: " + e);
        })
    }

}