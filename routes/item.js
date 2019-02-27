// external libraries imports
var express = require('express')
var router = express.Router()

var passport = require('passport')

// save route
router.post('/save', passport.authenticate('jwt', { session: false }), function(req, res) {
    let user_id = req.user.id 
    let { name, start_price, type, category, on_complete_delete } = req.body 

    let query = 'insert into items (name, start_price, type, category, on_complete_delete) values(?, ?, ?, ?, ?)'
    db.query(query, [ name, start_price, type, category, on_complete_delete ], function(error, result) {
       if(error || !result.insertId){
           res.json({ saved: false })
       }else{
           res.json({ saved: true, id: result.insertId })
       }
    }) // db.query(query, [ name, start_price, type, category, on_complete_delete ], function(error, result) { .. })

})


// delete route
router.post('/:id/delete', passport.authenticate('jwt', { session: false }), function(req, res) {
    let { id } = req.user 
    let { item_id } = req.params
    let query = 'select * from items where id = ? and user_id = ?'
    let deleteQuery = 'delete from items where id = ?'

    db.query(query, [ item_id, user_id ], function(error, results, fields){
        if( results[0] ){
           db.query(deleteQuery, [ item_id ], function(error, result){
               if(error || result.affectedRows == 0){
                   res.json({ deleted: false })
               }else{
                   res.json({ deleted: true })
               }
           }) // db.query(deleteQuery, [ item_id ], function(error, result){ .. })
        }else{
            res.json({ deleted: false })
        }
    }) // db.query(query, [ item_id, user_id ], function(error, results, fields){ .. })

})


// get details of an item
router.get('/:id/details', function(req, res) {
    let { id } = req.params
    let query = 'select * from items where id = ?'

    db.query(query, [ id ], function(error, results, fields) {
        
        if(results[0]) {
            res.json({ item: results[0] })
        }else{
            res.json({ item: null })
        }

    }) // db.query(query, [ id ], function(error, results, fields) { .. })

})

// get bids of an item 
router.get('/:id/bids', function(req, res) {
    let { id } = req.params
    let query = 'select * from bids where item_id = ?'

    db.query(query, [ id ], function(error, results, fields) {
        
        if(results) {
            res.json({ bids: results })
        }else{
            res.json({ bids: [] })
        }

    }) // db.query(query, [ id ], function(error, results, fields) { .. })

})


// get all items   
router.get('/all', function(req, res) {
    let query = 'select * from items'

    db.query(query, [ ], function(error, results, fields) {
        
        if(results) {
            res.json({ items: results })
        }else{
            res.json({ items: [] })
        }

    }) // db.query(query, [ id ], function(error, results, fields) { .. })
})

// get all items in a city   
router.get('/all/city/:city', function(req, res) {
    res.send('get all items in a city ')
})


module.exports = router 