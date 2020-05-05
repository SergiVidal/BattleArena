//API: spawn - GET
//http://puigpedros.salleurl.edu/pwi/arena/api/spawn/sergi
//5ea9be6141aff

//API: player - GET
//http://puigpedros.salleurl.edu/pwi/arena/api/player/5ea9be6141aff
//{
// "token":"5ea9be6141aff",
// "spawn":"29\/04\/2020 05:50:25",
// "x":3,
// "y":3,
// "d":"N",
// "vp":29,
// "name":"sergi",
// "attack":8,
// "defense":10,
// "class":0,
// "img":"http:\/\/www.rpglegion.com\/ff6\/monsters\/kefka2.png"
// }

//API: map - GET
//http://puigpedros.salleurl.edu/pwi/arena/api/map
// [[3,1],[1,1],[2,5],[4,5],[2,0],[5,4],[1,4],[2,3],[4,0],[4,2],[3,2],[1,4],[2,1],[1,4],[4,0],[5,4],[5,3],[3,3],[3,2],[1,3],[5,0],[4,4],[1,2],[5,0],[3,0],[2,4],[5,1],[0,5],[4,1],[2,2],[3,3]]
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

    get getSpawn(){
        return this.spawn;
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

    get getAttack(){
        return this.attack;
    }

    get getDefense(){
        return this.defense;
    }

    get getClass(){
        return this.class;
    }
    get getImg(){
        return this.img;
    }

    setD(d){
        this.d = d;
    }

    moveNorth(){
        this.x--;
    }

    moveWest(){
        this.y--;
    }

    moveEast(){
        this.y++;
    }

    moveSouth(){
        this.x++;
    }
}

/*
• Identificador único (token)
• Nombre (name)
• Posición horizontal (x)
• Posición vertical (y)
• Dirección donde mira el jugador (d)
• Ataque (attack)
• Defensa (defense)
• Puntos vitales (vp)
• Imagen (image)
 */

