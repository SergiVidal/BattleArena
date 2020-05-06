/**
 * Representa una clase PlayerAPI donde gestionar las llamadas a la API que hacen referencia al usuario.
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
            }
            //console.log(this.status);
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
                addTextToConsole("Ha ocurrido un error en el Servidor! Vuelva a intentarlo!");
            }
            //console.log(this.status);
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
                addTextToConsole("Ha ocurrido un error en el Servidor! Vuelva a intentarlo!");
            }
            //console.log(this.status);
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
                // addTextToConsole("Se ha obtenido la información del Jugador correctamente!");
                callback(JSON.parse(this.responseText));
            } else {
                // addTextToConsole("Ha ocurrido un error en el Servidor! Vuelva a intentarlo!");
            }
            //console.log(this.status);
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
            }
            //console.log(this.status);
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
                addTextToConsole("Ha ocurrido un error en el Servidor! Vuelva a intentarlo!");
            }
            //console.log(this.status);
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
                addTextToConsole("Ha ocurrido un error en el Servidor! Vuelva a intentarlo!");
            }
            //console.log(this.status);
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
                // addTextToConsole("Se ha obtenido correctamente la información de los enemigos colindantes!");
                callback(JSON.parse(this.responseText));
            } else {
                addTextToConsole("Ha ocurrido un error en el Servidor! Vuelva a intentarlo!");
            }
            //console.log(this.status);
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
                // addTextToConsole("Se ha obtenido correctamente la información del mapa!");
                callback(JSON.parse(this.responseText));
            } else {
                addTextToConsole("Ha ocurrido un error en el Servidor! Vuelva a intentarlo!");
            }
            //console.log(this.status);
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
     * Función encargada de refrescar el juego a tiempo real
     */
    fetchRefreshGame() {
        fetch("http://puigpedros.salleurl.edu/pwi/arena/api/player/" + player.getToken) //Obtener la información del jugador actual
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                player = new Player(data); //Actualizo el Jugador
                updateViewWithPlayerInfo(); //Actualizo las estadisticas del jugador (HTML - Player Stats)
            })
            .then(function () {
                getMapInfo(); //Obtener la información del mapa para poder actualizar el minimapa
            })
            .then(function () {
                getNearPlayers(); //Obtener la información de los enemigos colindantes
            }).then(function () {
            refreshGame(); //Vuelvo a llamar a la función refreshGame para que siga refrescando cada 1 segundo el juego.
        }).catch((e) => {
            console.log("error: " + e);
        })
    }

}