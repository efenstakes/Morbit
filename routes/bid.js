// external libraries imports
var express = require('express')
var router = express.Router()

// save route
router.post('/save', function(req, res) {
    res.send('save')
})


// delete route
router.post('/delete', function(req, res) {
    res.send('delete')
})


// get bid details 
router.get('/:id/details', function(req, res) {
    res.send('get bid details')
})


module.exports = router 