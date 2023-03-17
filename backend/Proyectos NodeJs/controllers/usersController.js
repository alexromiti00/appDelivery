    /**
 * Controlador de autenticación y registro de usuarios.
 * @module controllers/authController
 */
    
    
    const User = require('../models/user');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const keys = require('../config/keys');
    const storage = require('../utils/cloud_storage');
    const Rol = require('../models/roles');


    /**
 * Controlador para la autenticación de un usuario existente.
 * @function
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica si la autenticación tuvo éxito o falló.
 */

    module.exports = {/**
        * Autentica a un usuario a través de su correo electrónico y contraseña.
        * @param {Object} req - Objeto de solicitud de Express.
        * @param {Object} res - Objeto de respuesta de Express.
        * @returns {Object} - Objeto JSON que indica si la autenticación fue exitosa o no.
        */
    
        login(req, res) {

            // Obtenemos el email y la contraseña del cuerpo de la solicitud
            const email = req.body.email;
            const password = req.body.password;
            

            // Buscamos al usuario en la base de datos por su email
            User.findByEmail(email, async (err, myUser) => {
                
                console.log('Error ', err);
                console.log('USUARIO ', myUser);

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del usuario',
                        error: err
                    });
                }

                 // Si el usuario no existe, enviamos una respuesta con estado 401 (No autorizado)
                if (!myUser) {
                    return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                        success: false,
                        message: 'El email no fue encontrado'
                    });
                }

                 // Comparamos la contraseña proporcionada por el usuario con la contraseña almacenada en la base de datos
                const isPasswordValid = await bcrypt.compare(password, myUser.password);

                // Si la contraseña es válida, creamos un token de sesión y enviamos una respuesta con estado 201 (Creado)  
                if (isPasswordValid) {
                    const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                    const data = {
                        id: `${myUser.id}`,
                        name: myUser.name,
                        lastname: myUser.lastname,
                        email: myUser.email,
                        phone: myUser.phone,
                        image: myUser.image,
                        session_token: `JWT ${token}`,
                        roles: myUser.roles
                    }

                    return res.status(201).json({
                        success: true,
                        message: 'El usuario fue autenticado',
                        data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                    });

                }
                 // Si la contraseña es inválida, enviamos una respuesta con estado 401 (No autorizado)
                else {
                    return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                        success: false,
                        message: 'El password es incorrecto'
                    });
                }

            });

        },

        /**
         * Controlador para registrar un nuevo usuario sin imagen.
         * @function
         * @param {Object} req - Objeto de solicitud HTTP.
         * @param {Object} res - Objeto de respuesta HTTP.
         * @returns {Object} - Objeto JSON que indica si el registro tuvo éxito o falló.
         */


        register(req, res) {

            const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
            User.create(user, (err, data) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del usuario',
                        error: err
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            });

        },

        /**
         * Controlador para registrar un nuevo usuario con imagen.
         * @async
         * @function
         * @param {Object} req - Objeto de solicitud HTTP.
         * @param {Object} res - Objeto de respuesta HTTP.
         * @returns {Object} - Objeto JSON que indica si el registro tuvo éxito o falló.
         */

        async registerWithImage(req, res) {

            const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

            const files = req.files;

            if (files.length > 0) {
                const path = `image_${Date.now()}`;
                const url = await storage(files[0], path);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            User.create(user, (err, data) => {

            
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del usuario',
                        error: err
                    });
                }

                user.id = `${data}`;
                const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
                user.session_token = `JWT ${token}`;

                Rol.create(user.id, 3, (err, data) => {

                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con el registro del rol del usuario',
                            error: err
                        });
                    }

            
                    return res.status(201).json({
                            success: true,
                            message: 'El registro se realizo correctamente',
                            data: user
                    });
            
            
                });

                
            });

        },

        async updateWithImage(req, res) {

            const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

            const files = req.files;

            if (files.length > 0) {
                const path = `image_${Date.now()}`;
                const url = await storage(files[0], path);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            User.update(user, (err, data) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del usuario',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro se actualizo correctamente',
                    data: user
            });
            
                
            });

        },
              
        async updateWhithoutImage(req, res) {

            const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

            User.updateWhithoutImage(user, (err, data) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del usuario',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro se actualizo correctamente',
                    data: user
            });
            
                
            });

        },


    }