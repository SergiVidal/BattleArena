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
        /** @type {Array.<Object[]>} */
        this.domMatrix = [];
    }

    /**
     * Obtiene la matriz de elementos HTML
     * @returns {Array<Object[]>} - Matriz de elementos HTMl
     */
    get getDomMatrix() {
        return this.domMatrix;
    }

    /**
     * Inicializa la matriz de elementos HTML
     */
    initDomMatrix() {
        for (let i = 0; i < ROWS; i++) {
            this.domMatrix[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
                this.domMatrix[i][j] = null;
            }
        }
    }

    /**
     * Obtiene una casilla de la matriz de elementos HTML
     * @param x - Fila
     * @param y - Columna
     * @returns {Object}
     */
    getDomCell(x, y){
        return this.getDomMatrix[x][y];
    }

    /**
     * Modifica una casilla de la matriz de elementos HTML
     * @param x - Fila
     * @param y - Columna
     * @param element - Elemento HTML de la casilla
     */
    setDomCell(x, y, element){
        this.getDomMatrix[x][y] = element;
    }
}