const express = require('express');
const router = express.Router();

const storeCategoryInitData = require('./../../src/init/data/StoreCategoryInitData');

/* GET store Category listing. */
router.get('/', function(req, res, next) {
    res.json(storeCategoryInitData);
});
/* GET store Category by id. */
router.get('/:id', function(req, res, next) {
    res.json(storeCategoryInitData.find(element => element._id === req.params.id));
});

/* insert store Category. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* update store Category by id. */
router.post('/:id', function(req, res, next) {
    res.send('respond with a resource');
});
/* delete store Category by id. */
router.delete('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;