// external libraries imports
var express = require('express')
var router = express.Router()

// save route
router.post('/save', function(req, res) {
    res.send('save')
})


// delete route
router.post('/delete', function(req, res) {
    res.send('delete item')
})


// get details of an item
router.get('/:id/details', function(req, res) {
    res.send('get details of an item')
})

// get bids of an item 
router.get('/:id/bids', function(req, res) {
    res.send('get bids of an item')
})


// get all items   
router.get('/all', function(req, res) {
    res.send('get all items')
})

// get all items in a city   
router.get('/all/city/:city', function(req, res) {
    res.send('get all items in a city ')
})


module.exports = router 