/** ASYNC GET - Create new Player**/
function createNewPlayer(playerName, callback) {
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

/** ASYNC GET - Delete current Player**/
function deleteCurrentPlayer(token) {
    function reqListener() {
        alert("El jugador ha sido eliminado correctamente!")
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

function getCurrentPlayerInfo(token, callback) {
    function reqListener() {
        callback(JSON.parse(this.responseText));
    }

    var ajaxASYNC_GET = {
        request: function (url) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", reqListener);
            xhr.open("GET", url, true);
            xhr.send();
            // if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //     callback(JSON.parse(this.responseText));

                // return xhr.responseText;
            // }else {
            //     alert("Ha ocurrido un error, posiblemente el usuario ya exista");
            // }
        }
    };

    ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/player/" + token);
}

/** ASYNC GET - Get Player info**/
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