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
function initCreatePlayerForm(){
    closeCreatePlayerForm();
    document.getElementById('new-player').addEventListener("click", openCreatePlayerFrom);
    document.getElementById('btn-close-create-player').addEventListener("click", closeCreatePlayerForm);
    document.getElementById('form-create-player').addEventListener("click", onClickCreateNewPlayer);
}

/**
 * Se encarga de obtener el nombre del usuario y llamar a la función encargada de realizar la llamada a la API
 */
function onClickCreateNewPlayer() {
    var input_player_name = document.getElementById('input-player-name').value;
    // console.log(input_player_name);
    var playername = createNewPlayer(input_player_name);
    console.log(playername);
}