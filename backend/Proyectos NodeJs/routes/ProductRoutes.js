const productsController = require ('../controllers/productsController');
const passport = require ('passport');

module.exports = (app, upload) => {


    app.post('/api/products/create', passport.authenticate('jwt', {session:  false}), upload.array('image', 3), productsController.create);

    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session:  false}), productsController.findByCategory);

    app.delete('/api/products/delete/:id', passport.authenticate('jwt', {session:  false}), productsController.delete);
   
    app.put('/api/products/updateWihtImage', passport.authenticate('jwt', {session:  false}), upload.array('image', 3), productsController.updateWihtImage);

    app.put('/api/products/update', passport.authenticate('jwt', {session:  false}), productsController.update);

    

}