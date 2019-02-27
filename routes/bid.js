// external libraries imports
var express = require('express')
var router = express.Router()

// save route
router.post('/save', passport.authenticate('jwt', { session: false }), function(req, res) {
    let { id } = req.user 
    let { item_id, price } = req.body
    let query = 'insert into bids (item_id, user_id, price) values(?, ?, ?)'

    db.query(query, [ item_id, id, price ], function(error, result){
        if( error ){
            return res.json({ saved: false, id: null })
        } else {
            res.json({ saved: true, id: result.insertId })
        }
    })

})


// delete route
router.post('/:id/delete', function(req, res) {
    let user_id = req.user.id 
    let bid_id = req.params.id
    let query = 'select * from bids where id = ? and user_id = ?'
    let deleteQuery = 'delete from bids where id = ?'

    db.query(query, [ bid_id, user_id ], function(error, results, fields){
        if( results[0] ){
           db.query(deleteQuery, [ bid_id ], function(error, result){
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


// get bid details 
router.get('/:id/details', function(req, res) {
    let { id } = req.params
    let query = 'select * from bids where id = ?'

    db.query(query, [ id ], function(error, results, fields) {
        
        if(results[0]) {
            res.json({ bid: results[0] })
        }else{
            res.json({ bid: null })
        }

    }) // db.query(query, [ id ], function(error, results, fields) { .. })

})

// get all bids   
router.get('/all', function(req, res) {
    let query = 'select * from bids'

    db.query(query, [ ], function(error, results, fields) {
        
        if(!error) {
            res.json({ bids: results })
        }else{
            res.json({ bids: [] })
        }

    }) // db.query(query, [ id ], function(error, results, fields) { .. })
})



module.exports = router 