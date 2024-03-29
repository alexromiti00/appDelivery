const Product = require('../models/product.js');
const storage = require ('../utils/cloud_storage');
const asyncForeach = require ('../utils/async_foreach');

module.exports = {

 //Metodo para insertar tres imagenes en una soa peticion   HTTP
    async create(req, res) {

            const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

            const files = req.files;

            let inserts = 0;// Esta variable llevara la cuenta de cuantas imagenes se han insertado

            if (file.length === 0 ) {
                  
                return res.status(501).json({
                    success: false,
                    message: 'Error a registrar el producto no tiene imagenes',
                });
            }
            else{
                    
                Product.create(product, (err, id_product) => {
            
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con el registro del producto',
                            error: err
                        });
                    }

                    product.id =  product.id;
                    const start = async () => {


                        await asyncForeach(files, async (file) => {

                            const path = `image_${Date.now()}`;
                            const url = await storage(file, path);

                            if (url != undefined && url != null) {// Se creo la imagen en firebase
                                
                                if (inserts == 0 ) {// Imagen 1
                                        product.image1 = url
                                }
                                else if (inserts == 1 ) {
                                        product.image2 = url
                                }
                                else if (inserts == 2 ) {
                                    product.image3 = url
                            }
                        }
                            await Product.update(product, (err, data ) => {

                                if (err) {
                                    return res.status(501).json({
                                        success: false,
                                        message: 'Hubo un error con el registro del producto',
                                        error: err
                                    });
                                }


                                inserts = inserts + 1 ;

                                if (inserts == files.length) {//Termino de almacenart las tres imagenes

                                    return res.status(201).json({
                                        success: true,
                                        message: 'El  producto se almacenop correctamente',
                                       data: data
                                    });   
                            }
                        });
                    });
                }

                start();

            });
         }
    }
}
