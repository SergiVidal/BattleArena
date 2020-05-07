/**
 * The complete Player.
 * @typedef {Object} Player
 * @property {string} token - Identificador único
 * @property {string} spawn - Fecha de creación del player
 * @property {number} x - Posición horizontal
 * @property {number} y - Posición vertical
 * @property {string} d - Dirección donde mira el jugador
 * @property {number} vp - Puntos Vitales del jugador
 * @property {string} name - Nombre del jugador
 * @property {number} attack - Ataque
 * @property {number} defense - Defensa
 * @property {number} class - Clase/Tipo de player (Jugador, Enemigo...)
 * @property {string} img - Imagen del jugador (Dragon, Esqueleto...)
 */

/**
 * Representa una clase Player donde almacenar su información.
 * @constructor
 * @param {Player} object - Info user
 * */
class Player {
    constructor(object) {
        this.token = object.token;
        this.spawn = object.spawn;
        this.x = object.x;
        this.y = object.y;
        this.d = object.d;
        this.vp = object.vp;
        this.name = object.name;
        this.attack = object.attack;
        this.defense = object.defense;
        this.class = object.class;
        this.img = object.img;
    }

    get getToken(){
        return this.token;
    }

    get getX(){
        return this.x;
    }

    get getY(){
        return this.y;
    }

    get getD(){
        return this.d;
    }
    get getVp(){
        return this.vp;
    }

    get getName(){
        return this.name;
    }

    get getImg(){
        return this.img;
    }
}