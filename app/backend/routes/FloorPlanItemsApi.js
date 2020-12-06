const express = require('express');
const router = express.Router();


/* GET floor plan item by id. */
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* insert floor plan item. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource');
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