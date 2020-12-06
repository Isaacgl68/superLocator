const express = require('express');
const router = express.Router();

const storesChainsInitData = require('./../../src/init/data/StoresChainsInitData');

/* GET stores Chains listing. */
router.get('/', function(req, res, next) {
    res.json(storesChainsInitData);
});
/* GET stores Chains by id. */
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* insert stores Chains. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* update stores Chains by id. */
router.post('/:id', function(req, res, next) {
    res.send('respond with a resource');
});
/* delete stores Chains by id. */
router.delete('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;