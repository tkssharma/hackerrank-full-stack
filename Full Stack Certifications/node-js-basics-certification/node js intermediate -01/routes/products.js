const router = require('express').Router();
const controller = require('../controllers/products');


router.post('/products', controller.createProduct);
router.get('/products', controller.getAllProducts);
router.get('/products/:id', controller.getProductById);
router.patch('/products/:id', controller.patchProductById);
router.delete('/products/:id', controller.updateProductById);
router.put('/products/:id', controller.updateProductById);

module.exports = router;
