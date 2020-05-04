/**
 * Representa una clase Player donde almacenar su información.
 * @constructor
 */

class PlayerAPI{
    constructor() {
        /**
         * @type {String} - Identificador único del Jugador Actual
         * */
        this.token = "";
    }

    /**
     * Función encargada de obtener el token del Jugador Actual
     * @returns {String} - Identificador único del Jugador Actual
     */
    get getToken(){
        return this.token;
    }

    /**
     * Función encargada de actualizar el token del Jugador Actual
     * @param token - Identificador único del Jugador Actual
     */
    setToken(token){
        this.token = token;
    }

    /**
     * Funcion encargada de llamar a la API para crear un Nuevo Jugador
     * @param playerName - Nombre del usuario
     * @param callback - Función callback donde tratar la información de la API
     */
    createNewPlayer(playerName, callback) {
        function reqListener() {
            callback(this.responseText);
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
            callback();
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
            callback();
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
            callback(JSON.parse(this.responseText));
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
    movePlayer(token, d, callback){
        function reqListener() {
            callback();
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
    attackPlayer(token, d, callback){
        function reqListener() {
            callback();
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
}


// /**
//  * Funcion encargada de llamar a la API para crear un Nuevo Jugador
//  * @param playerName - Nombre del usuario
//  * @param callback - Función callback donde tratar la información de la API
//  */
// function createNewPlayer(playerName, callback) {
//     function reqListener() {
//         callback(this.responseText);
//     }
//
//     var ajaxASYNC_GET = {
//         request: function (url) {
//             var xhr = new XMLHttpRequest();
//             xhr.addEventListener("load", reqListener);
//             xhr.open("GET", url, true);
//             xhr.send();
//         }
//     };
//
//     ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/spawn/" + playerName);
// }

// /**
//  * Funcion encargada de llamar a la API para eliminar el Jugador Actual
//  * @param token - Identificqador único del Jugador Actual
//  * @param callback - Función callback donde tratar la información de la API
//  */
// function deleteCurrentPlayer(token, callback) {
//     function reqListener() {
//         callback();
//     }
//
//     var ajaxASYNC_GET = {
//         request: function (url) {
//             var xhr = new XMLHttpRequest();
//             xhr.addEventListener("load", reqListener);
//             xhr.open("GET", url, true);
//             xhr.send();
//         }
//     };
//
//     ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/remove/" + token);
// }

// /**
//  * Funcion encargada de llamar a la API para actualizar el Jugador Actual
//  * @param token - Identificqador único del Jugador Actual
//  * @param callback - Función callback donde tratar la información de la API
//  */
// function respawnCurrentPlayer(token, callback) {
//     function reqListener() {
//         callback();
//     }
//
//     var ajaxASYNC_GET = {
//         request: function (url) {
//             var xhr = new XMLHttpRequest();
//             xhr.addEventListener("load", reqListener);
//             xhr.open("GET", url, true);
//             xhr.send();
//         }
//     };
//
//     ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/respawn/" + token);
// }

// /**
//  * Funcion encargada de llamar a la API para obtener la información del Jugador Actual
//  * @param token - Identificqador único del Jugador Actual
//  * @param callback - Función callback donde tratar la información de la API
//  */
// function getCurrentPlayerInfo(token, callback) {
//     function reqListener() {
//         callback(JSON.parse(this.responseText));
//     }
//
//     var ajaxASYNC_GET = {
//         request: function (url) {
//             var xhr = new XMLHttpRequest();
//             xhr.addEventListener("load", reqListener);
//             xhr.open("GET", url, true);
//             xhr.send();
//             // if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             //     callback(JSON.parse(this.responseText));
//
//                 // return xhr.responseText;
//             // }else {
//             //     alert("Ha ocurrido un error, posiblemente el usuario ya exista");
//             // }
//         }
//     };
//
//     ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/player/" + token);
// }

/**
 * Funcion encargada de llamar a la API para obtener información detallada de los jugadores y enemigos localizados en celdas colindantes
 * @param token - Identificqador único del Jugador Actual
 * @param callback - Función callback donde tratar la información de la API
 */
function getNearPlayers(token, callback) {
    function reqListener() {
        callback(JSON.parse(this.responseText));
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

//TODO: Preguntar como comprobar si las llamadas han sido 200 o !200