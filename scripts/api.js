/** ASYNC GET - Create new Player**/
function createNewPlayer(playerName, callback) {
    function reqListener () {
        //var People = eval(this.responseText); // NO
        // var Player = JSON.parse(this.responseText);
        // console.log(Player);
        // console.log(this.responseText);
        callback(this.responseText);
}

    var ajaxASYNC_GET = {
        request: function (url){
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", reqListener);
            xhr.open("GET", url, true);
            xhr.send();
        }
    };

    // console.log("http://puigpedros.salleurl.edu/pwi/arena/api/spawn/"+playerName);
    ajaxASYNC_GET.request("http://puigpedros.salleurl.edu/pwi/arena/api/spawn/"+playerName);
}