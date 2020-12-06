var express = require('express');
var router = express.Router();


/* GET floor units by id. */
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* insert floor units by id. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* update floor units by id. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* delete floor units by id. */
router.delete('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;