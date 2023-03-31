const productsController = require ('../controllers/productsController');
const passport = require ('passport');

module.exports = (app, upload) => {


    app.post('/api/products/create', passport.authenticate('jwt', {session:  false}), upload.array('image', 3), productsController.create);

    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session:  false}), productsController.findByCategory);
     
    /*app.get('/api/categories/getAll', passport.authenticate('jwt', {session:  false}), categoriesController.getAll);
   
    app.put('/api/categories/updateWithImage', passport.authenticate('jwt', {session:  false}), upload.array('image', 1), categoriesController.updateWithImage);

    app.put('/api/categories/update', passport.authenticate('jwt', {session:  false}), categoriesController.update);

    app.delete('/api/categories/delete/:id', passport.authenticate('jwt', {session:  false}), categoriesController.delete);*/

}