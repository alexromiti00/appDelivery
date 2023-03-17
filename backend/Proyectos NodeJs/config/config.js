/*
Este módulo establece una conexión a una base de datos MySQL y la exporta para su uso en otros archivos.

Para utilizar este módulo, primero debe requerirse en el archivo donde se desea utilizar la conexión:

const db = require('./db');

Luego, la conexión puede ser utilizada llamando a los métodos de la conexión "db":
*/





// Importar el módulo mysql2 para poder conectarse a la base de datos
const mysql = require('mysql2');


/**
 * // Crear una conexión a la base de datos con los parámetros de configuración
 * @date 3/11/2023 - 11:07:05 AM
 * Crea una conexión a la base de datos con los parámetros de configuración especificados.
 *@param {Object} options - Objeto que contiene las opciones de configuración de la conexión.
 * @param {string} options.host - El nombre del host donde se encuentra la base de datos.
 * @param {string} options.user - El nombre de usuario utilizado para conectarse a la base de datos.
 * @param {string} options.password - La contraseña utilizada para conectarse a la base de datos.
 * @param {string} options.database - El nombre de la base de datos a la que se desea conectarse.
 * @returns {Object} - Un objeto que representa la conexión a la base de datos.
 */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shaco1996',
    database: 'delivey'
});


// Conectar a la base de datos y manejar cualquier error que se produzca
/**
 * Conecta a la base de datos utilizando la conexión especificada.
 * Si se produce un error durante la conexión, se lanzará una excepción.
 * @param {Object} db - El objeto que representa la conexión a la base de datos.
 * @throws {Error} - Si no se puede conectar a la base de datos.
 */
db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

// Exportar la conexión para su uso en otros archivos
module.exports = db;