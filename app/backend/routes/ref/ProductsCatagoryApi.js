const express = require('express');
const router = express.Router();

const productCategoryInitData = require('./../../src/init/data/ProductCategoryInitData');

/* GET product Category listing. */
router.get('/', function(req, res, next) {
    res.json(productCategoryInitData);
});
/* GET  product Category by id. */
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* insert  product Category by id. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* update  product Category by id. */
router.post('/:id', function(req, res, next) {
    res.send('respond with a resource');
});
/* delete product Category by id. */
router.delete('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;