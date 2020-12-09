const express = require('express');
const router = express.Router();

const storesInitData = require('./../src/init/data/StoresInitData');
router.get('/', function(req, res, next) {
    res.json(storesInitData);
});

/* GET store by id. */
router.get('/:id', function(req, res, next) {
    res.json(storesInitData.find(element => element._id === req.params.id));
});

/* insert store. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* update store by id. */
router.post('/:id', function(req, res, next) {
    res.send('respond with a resource');
});
/* delete store by id. */
router.delete('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;