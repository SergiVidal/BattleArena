/**
 * Representa una clase PlayerAPI donde gestionar las llamadas a la API que hacen referencia al usuario.
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
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "El jugador ha sido creado correctamente!";
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(response, this.status);

            }
            callback(response, this.status, this.responseText);
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
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "El jugador ha sido actualizado correctamente!";
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(response, this.status);

            }
            callback(response, this.status);
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
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "El jugador ha sido eliminado correctamente!";
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(response, this.status);
            }
            callback(response, this.status);
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
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "Se ha obtenido la información del Jugador correctamente!";
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(response, this.status);
            }
            callback(response, this.status, JSON.parse(this.responseText));
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
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "El Jugador se ha movido a la dirección: "+ d;
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(this.responseText);
            }
            callback(response, this.status);
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
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "El Jugador ha atacado a la dirección: "+ d;
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(this.responseText);
            }
            callback(response, this.status);
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

    //TODO: ERROR AL RECUPERAR EL RANKING, POR CULPA DEL FORMATO, NO FUNCIONA JSON.parse()

    /**
     * Función encargada de obtener el Ranking de Jugadores
     * @param callback - Función callback donde tratar la información de la API
     */
    showRanking(callback){
        function reqListener() {
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "Se ha mostrado correctamente el Ranking";
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(this.responseText);
            }
            callback(response, this.status, JSON.parse(this.responseText));
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
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "Se ha obtenido correctamente la información de los enemigos colindantes!";
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(this.responseText);
            }
            callback(response, this.status, JSON.parse(this.responseText));
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
    getMap(callback) {
        function reqListener() {
            let response;
            if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                response = "Se ha obtenido correctamente la información del mapa!";
                console.log(response, this.status);
            }else {
                response = "Ha ocurrido un error!";
                console.log(this.responseText);
            }
            callback(response, this.status, JSON.parse(this.responseText));
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
}