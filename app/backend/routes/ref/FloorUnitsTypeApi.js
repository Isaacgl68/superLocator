const express = require('express');
const router = express.Router();

const floorUnitTypeInitData = require('./../../src/init/data/FloorUnitTypeInitData');

/* GET floor units listing. */
router.get('/', function(req, res, next) {
    res.json(floorUnitTypeInitData);
});
/* GET floor units by id. */
router.get('/:id', function(req, res, next) {
    res.json(floorUnitTypeInitData.find(element => element._id === req.params.id));
});

/* insert floor units. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* update floor units by id. */
router.post('/:id', function(req, res, next) {
    res.send('respond with a resource');
});
/* delete floor units by id. */
router.delete('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;