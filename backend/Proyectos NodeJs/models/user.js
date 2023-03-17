const db = require('../config/config');
const bcrypt = require('bcryptjs');
const { use } = require('passport');

/**
 * Objeto que representa un usuario en la base de datos.
 * @typedef {Object} User
 * @property {number} id - El ID del usuario.
 * @property {string} email - El correo electrónico del usuario.
 * @property {string} name - El nombre del usuario.
 * @property {string} lastname - El apellido del usuario.
 * @property {string} image - La imagen del usuario.
 * @property {string} phone - El número de teléfono del usuario.
 * @property {string} password - La contraseña del usuario.
 * @property {Object[]} roles - Los roles asociados con el usuario.
 * @property {number} roles[].id - El ID del rol.
 * @property {string} roles[].name - El nombre del rol.
 * @property {string} roles[].image - La imagen del rol.
 * @property {string} roles[].route - La ruta del rol.
 */

/**
 * Busca un usuario por su ID en la base de datos.
 * @param {number} id - El ID del usuario a buscar.
 * @param {(err: any, user: User) => void} result - Función de callback que se llamará después de que se complete la búsqueda en la base de datos. Si se produce un error, se pasará el error como primer argumento de la función. De lo contrario, se pasará el objeto de usuario como segundo argumento de la función.
 * @returns {void}
 */

const User = {};

User.findById = (id, result) => {

    const sql = `
    SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.image,
            U.phone,
            U.password,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
         ) AS roles 
            
        FROM
            users AS U
        INNER JOIN  
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN 
            roles AS R
        ON
            UHR.id_rol = R.id
        WHERE
            U.id = ?
        GROUP BY
            U.id        
    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

/**
 * Busca un usuario por su correo electrónico en la base de datos.
 * @param {string} email - El correo electrónico del usuario a buscar.
 * @param {(err: any, user: User) => void} result - Función de callback que se llamará después de que se complete la búsqueda en la base de datos. Si se produce un error, se pasará el error como primer argumento de la función. De lo contrario, se pasará el objeto de usuario como segundo argumento de la función.
 * @returns {void}
 */
User.findByEmail = (email, result) => {

    const sql = `
        SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.image,
            U.phone,
            U.password,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
         ) AS roles 
            
        FROM
            users AS U
        INNER JOIN  
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN 
            roles AS R
        ON
            UHR.id_rol = R.id
        WHERE
            email = ?
        GROUP BY
            U.id        
    `;

    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}


/**
 * Crea un nuevo registro de usuario en la base de datos.
 * @param {Object} user - Un objeto que contiene la información del usuario.
 * @param {function} result - Una función de devolución de llamada que se ejecutará después de que se complete la operación de base de datos.
 */

User.create = async (user, result) => {

    
    // Genera un hash de la contraseña proporcionada por el usuario.
    const hash = await bcrypt.hash(user.password, 10);

    // Construye la cadena SQL que insertará un nuevo registro en la tabla `users`.
    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Ejecuta la consulta SQL con los valores del usuario y el hash de la contraseña como parámetros.
    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                // Si la consulta no se ejecuta correctamente, invoca la función de devolución de llamada con un objeto `Error` como primer argumento y `null` como segundo argumento
                console.log('Error:', err);
                result(err, null);
            }
            else {
                 // Si la consulta se ejecuta correctamente, invoca la función de devolución de llamada con `null` como primer argumento y el ID del nuevo usuario como segundo argumento.
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

User.updateWhithoutImage = (user, result) =>{

    const sql =  `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        updated_at = ?
    WHERE
        id = ?
    `;
        db.query
        (
            sql,
            [
                //Siempre llevar el roden que se especificaron en los parametros
                user.name,
                user.lastname,
                user.phone,
                new Date(),
                user.id
            ],
            (err, res) => {
                if (err) {
                    // Si la consulta no se ejecuta correctamente, invoca la función de devolución de llamada con un objeto `Error` como primer argumento y `null` como segundo argumento
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    // Si la consulta se ejecuta correctamente, invoca la función de devolución de llamada con `null` como primer argumento y el ID del nuevo usuario como segundo argumento.
                    console.log('Usuario Actualizado:', user.id);
                    result(null, user.id);
                }
            }
        )
     }

User.update = (user, result) =>{

    const sql =  `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        image = ?,
        updated_at = ?
    WHERE
        id = ?
        `;
        db.query
        (
            sql,
            [
                //Siempre llevar el roden que se especificaron en los parametros
                user.name,
                user.lastname,
                user.phone,
                user.image,
                new Date(),
                user.id
            ],
            (err, res) => {
                if (err) {
                    // Si la consulta no se ejecuta correctamente, invoca la función de devolución de llamada con un objeto `Error` como primer argumento y `null` como segundo argumento
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    // Si la consulta se ejecuta correctamente, invoca la función de devolución de llamada con `null` como primer argumento y el ID del nuevo usuario como segundo argumento.
                    console.log('Usuario Actualizado:', user.id);
                    result(null, user.id);
                }
            }
        )
     }

module.exports = User;