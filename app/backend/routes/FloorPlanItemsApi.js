const express = require('express');
const router = express.Router();
const floorPlanItemsInitData = require('../src/init/data/FloorPlanItemsInitData');
let id = 1000;


/* GET store floor plan items. */
router.get('/store/:storeId', function(req, res, next) {
    res.json(floorPlanItemsInitData.filter(element => element.storeId === req.params.storeId));
});
router.get('/:id', function(req, res, next) {
    res.json(floorPlanItemsInitData.find(element => element._id === req.params.id));
});

/* insert floor plan item. */
router.put('/', function(req, res, next) {
    const newItem = req.body;
    newItem._id =`${id++}`;
    console.log(newItem);
    floorPlanItemsInitData.push(req.body);
    res.json(newItem);
});
/* update floor plan item. */
router.post('/:id', function(req, res, next) {
    res.send('respond with a resource');
});
/* delete floor plan item by id. */
router.delete('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;