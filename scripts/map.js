/** @constant {number} - Número de filas que tiene la matriz Map */
const ROWS = 6;
/** @constant {number} - Número de columnas que tiene la matriz Map */
const COLUMNS = 6;

/**
 * Representa una clase Map donde almacenar si cada casilla de la matriz esta ocupada por un player/enemigo
 * @constructor
 * */
class Map {
    constructor() {
        /**
         * @type {Array.<boolean[]>} - True (Ocupada) / False (Desocupada)
         * */
        this.matrix = [];
    }

    get getMatrix() {
        return this.matrix;
    }

    init() {
        for (let i = 0; i < ROWS; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
                this.matrix[i][j] = false;
            }
        }
    }
}

// //constructor() {
//     /**
//      * @type type1
//      * */
//     //this.type1 = 1;
//     /**
//      * @type type2
//      * */
//     //this.type2 = 2;
// // }