// external libraries imports
var express = require('express')
var router = express.Router()

// import the database handle
var db = require('../config/mysql')

// save route
router.post('/save', function(req, res) {
  
  console.log('got body')
  console.log(req.body)

  let response = { saved: false, id: null }

  // get request body data 
  let { name, password, city, email } = req.body

  let insertQuery = 'insert into users (name, password, city, email) values(?, ?, ?, ?)'

  db.query(insertQuery, [ name, password, city, email ], function(error, result){

    if(!error) {
        response.saved = false
        response.id = result.insertId
        res.json(response)
    }else{
        res.json(response)
    }

  })

})


// delete user
router.post('/delete', function(req, res) {
    res.send('delete user')
})


// get session for user 
router.post('/get-session', function(req, res) {
    res.send('get session')
})

// check if user has a session
router.post('/has-session', function(req, res) {
    res.send('has session')
})

// get details for this user
router.get('/:id/details', function(req, res) {
  let response = { user: null }
  
  let query = 'select * from users where id = ?'
  
  db.query(query, [ req.params.id ], function(error, result, fields){
  
    if(!error) {
        response.user = result
        res.json(response)
    }else{
        res.json(response)
    }
  
  }) // db.query(query, [.. 
})

// get bids for this user
router.get('/:id/bids', function(req, res) {
    let response = { bids: null }
  
    let query = 'select * from bids where user_id = ?'
    
    db.query(query, [ req.params.id ], function(error, result, fields){
    
      if(!error) {
          response.bids = result
          res.json(response)
      }else{
          res.json(response)
      }
    
    }) // db.query(query, [..
})

// get items for this user
router.get('/:id/items', function(req, res) {
    let response = { items: null }
  
    let query = 'select * from items where user_id = ?'
    
    db.query(query, [ req.params.id ], function(error, result, fields){
    
      if(!error) {
          response.items = result
          res.json(response)
      }else{
          res.json(response)
      }
    
    }) // db.query(query, [..
})


module.exports = router 