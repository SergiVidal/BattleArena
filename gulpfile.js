/**
 * Se encarga de copiar ficheros de un origen (src) a un destino (dest)
 * NOTA: Requiere tener instalado gulp --> npm install gulp
 */
const { src, dest } = require('gulp');

/**
 * Se encarga de minimizar ficheros .js
 * Crea los ficheros minimizados con el siguiente formato: SCRIPT-min.js
 * NOTA: Requiere tener instalada la herramienta gulp-minify --> npm install gulp-minify
 * @type {function(*=): *}
 */
const minify = require('gulp-minify');

/**
 * Se encarga de eliminar ficheros
 * NOTA: Requiere tener instalada la herramienta delete --> npm install delete
 * @type {del}
 */
const del = require('delete');

/**
 * Se encarga de reemplazar texto de ficheros, hay que indicarle el texto a modificar y el nuevo texto
 * NOTA: Requiere tener instalada la herramienta glup-replace --> npm install gulp-replace
 * @type {function(*=, *=, *=): Transform}
 */
const replace = require('gulp-replace');

/**
 * Permite ejecutar diversas funciones de forma consecutiva (en serie, una por una)
 */
const { series } = require('gulp');

/**
 * Permite ejecutar diversas funciones de forma paralela
 */
const { parallel } = require('gulp');

/**
 * Función encargada de minimizar todos los ficheros .js localizados en: src/scripts
 * @returns {*|void}
 */
function srcMIN() {
    return src('src/scripts/*.js')
        .pipe(minify())
        .pipe(dest('src/scripts'))
}

/**
 * Función encargada de copiar todos los ficheros minimizados localizados en: src/scripts, a: build/scripts
 * @returns {*|void}
 */
function buildJS() {
    return src('src/scripts/*-min.js')
        .pipe(dest('build/scripts'))
}

/**
 * Función encargada de eliminar todos los ficheros minimizados localizados en: src/scripts
 * @returns {*|undefined}
 */
function delMIN() {
    return del(['src/scripts/*-min.js']);
}

/**
 * Función encargada de copiar el fichero index.html localizado en: src, a: build
 * Pero modificando los scripts indicados en index.html para que use los minimizados mediante un replace
 * @returns {*|void}
 */
function replaceHTML() {
    return src(['src/index.html'])
        .pipe(replace('api.js', 'api-min.js'))
        .pipe(replace('game.js', 'game-min.js'))

        .pipe(replace('map.js', 'map-min.js'))
        .pipe(replace('player.js', 'player-min.js'))

        .pipe(dest('build'));
}

/**
 * Función encargada de copiar todos los ficheros .css localizados en: src/styles, a: build/styles
 * @returns {*|void}
 */
function buildCSS() {
    return src('src/styles/*.css')
        .pipe(dest('build/styles'))
}

/**
 * Función encargada de copiar todos los ficheros .otf localizados en: src/font, a: build/font
 * @returns {*|void}
 */
function buildFONT() {
    return src('src/font/*.otf')
        .pipe(dest('build/font'))
}

/**
 * Función encargada de copiar todas las imagenes localizadas en: src/images, a: build/images
 * @returns {*|void}
 */
function buildIMG() {
    return src('src/images/*')
        .pipe(dest('build/images'))
}

/**
 * Función encargada de copiar todas las canciones localizadas en: src/song, a: build/song
 * @returns {*|void}
 */
function buildSONG() {
    return src('src/song/*')
        .pipe(dest('build/song'))
}

/**
 * Función por defecto de Glub encargada de ejecutar en serie las funciones:
 * srcMIN, buildJS, delMIN (Debido a que debe de seguir un orden ya que se está tratando con los mismos ficheros)
 * y en paralelo las funciones:
 * replaceHTML, buildCSS, buildFONT, buildIMG, buildSONG (Debido a que el orden en el que se ejecuten es indiferente)
 */
exports.default = series(srcMIN, buildJS, delMIN, parallel(replaceHTML, buildCSS, buildFONT, buildIMG, buildSONG));