/**
 * Módulo que inicia una aplicación Express y crea un servidor HTTP.
 * @module app
 */




/**
 * Módulo express
 * @const
 */
const express = require('express');
/**
 * Instancia de express.
 * @type {object}
 * @const
 */
const app = express();
/**
 * Módulo http.
 * @const
 */
const http = require('http');
/**
 * Servidor http creado a partir de la instancia de express.
 * @type {object}
 * @const
 */
const server = http.createServer(app);
/**
 * Módulo morgan para el registro de solicitudes HTTP.
 * @const
 */
const logger = require('morgan');
/**
 * Módulo cors para habilitar CORS en las solicitudes HTTP.
 * @const
 */
const cors = require('cors');
/**
 * Módulo passport para autenticación de usuarios.
 * @const
 */
const passport = require('passport');
/**
 * Módulo multer para el manejo de archivos.
 * @const
 */
const multer = require('multer');

/*
* IMPORTAR RUTAS
*/
/**
 * Módulo que contiene las rutas de usuarios.
 * @const
 */
const usersRoutes = require('./routes/userRoutes');


/**
 * Puerto en el que el servidor escucha. Utiliza el valor de la variable de entorno PORT si está definido, de lo contrario, utiliza el puerto 3000.
 * @type {number}
 * @const
 */
const port = process.env.PORT || 3000;
/**
 * Registra el middleware de morgan con la configuración 'dev'.
 */

app.use(logger('dev'));
/**
 * Registra el middleware de análisis de solicitudes JSON.
 */
app.use(express.json());
/**
 * Registra el middleware de análisis de solicitudes codificadas en URL.
 */
app.use(express.urlencoded({
    extended: true
}));

/**
 * Registra el middleware de cors para habilitar CORS en las solicitudes HTTP.
 */
app.use(cors());
/**
 * Registra el middleware de passport para inicializar la autenticación de usuarios.
 */
app.use(passport.initialize());

/**
 * Registra el middleware de passport para utilizar sesiones de usuario.
 */
app.use(passport.session());

/**
 * Requiere el archivo de configuración de passport y lo utiliza para la autenticación de usuarios.
 */
require('./config/passport')(passport);

/**
 * Deshabilita el encabezado 'x-powered-by' en las respuestas HTTP.
 */
app.disable('x-powered-by');

/**
 * Configura el puerto en el que el servidor escucha.
 */
app.set('port', port);

/**
 * Crea un objeto de multer para manejar el almacenamiento de archivos en memoria.
 */
const upload = multer({
    storage: multer.memoryStorage()
});

/*
* LLAMADO DE LAS RUTAS
*/
/**
 * Registra las rutas de usuario importadas en el servidor utilizando la instancia de express y el objeto de multer creado anteriormente.
 * @function
 * @param {object} app - Instancia de express.
 * @param {object} upload - Objeto de multer.
 */
usersRoutes(app, upload);

/**
 * Hace que el servidor escuche en el puerto 3000 de la dirección IP especificada (192.168.100.14 o localhost) e imprime un mensaje en la consola indicando que el servidor se ha iniciado correctamente.
 */
server.listen(3000, '192.168.100.24' || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});


// ERROR HANDLER
/**
 * Middleware para manejar errores en el servidor.
 */
app.use((err, req, res, next) => {Z
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/',  (req, res) => {
    res.send('Ruta raiz del backend');
});

/**
 * Objeto que contiene la instancia de Express y el servidor HTTP.
 * @type {Object}
 * @property {module:express} app - Instancia de Express.
 * @property {http.Server} server - Servidor HTTP.
 */
module.exports = {
    app: app,
    server: server
}

/**
 * Códigos de estado HTTP.
 * @namespace
 * @property {number} 200 - Respuesta exitosa.
 * @property {number} 404 - URL no encontrada.
 * @property {number} 500 - Error interno del servidor.
 */