/**
 * Objeto que representa un rol de usuario en la base de datos.
 * @typedef {Object} Rol
 */

/**
 * Crea una nueva entrada en la tabla `user_has_roles` con el id del usuario y el id del rol proporcionados.
 * @param {number} id_user - El id del usuario al que se le asignará el rol.
 * @param {number} id_rol - El id del rol que se le asignará al usuario.
 * @param {(err: any, res: any) => void} result - Función de callback que se llamará después de que se complete la operación de inserción en la base de datos.
 * @returns {void}
 */ 
const db = require('../config/config');


/**
 * Objeto que contiene todas las funciones relacionadas con los roles de usuario en la base de datos.
 * @namespace Rol
 */
const Rol = {};


/**
 * Crea una nueva entrada en la tabla `user_has_roles` con el id del usuario y el id del rol proporcionados.
 *
 * @memberof Rol
 * @function create
 *
 * @param {number} id_user - El id del usuario al que se le asignará el rol.
 * @param {number} id_rol - El id del rol que se le asignará al usuario.
 * @param {(err: any, res: any) => void} result - Función de callback que se llamará después de que se complete la operación de inserción en la base de datos.
 * @returns {void}
 */

Rol.create = (id_user, id_rol, result) => {

          const sql = `
            INSERT INTO
                user_has_roles(
                    id_user,
                    id_rol,
                    created_at,
                    updated_at
                )
            VALUES(?, ?, ?, ?)
        `;

        /**
   * Inserta un registro en la tabla 'user_has_roles' con el id del usuario y el id del rol proporcionados.
   *
   * @memberof Rol.create
   * @function db.query
   * 
   * @param {string} sql - Cadena SQL que se utilizará para insertar el registro.
   * @param {Array<any>} values - Valores que se insertarán en la consulta SQL.
   * @param {(err: any, res: any) => void} callback - Función de callback que se llamará después de que se complete la operación de inserción en la base de datos.
   * @returns {void}
   */
        db.query(
            sql,
            [id_user, id_rol, new Date(), new Date()],
            (err, res) => {
                if (err) {
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    console.log('Usuario obtenido:', res.insertId);
                    result(null, res.insertId);
                }
            }
        )


}

/**
 * Módulo que contiene todas las funciones relacionadas con los roles de usuario en la base de datos.
 * @module Rol
 */

module.exports = Rol;