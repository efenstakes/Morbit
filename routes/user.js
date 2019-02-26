// external libraries imports
var express = require('express')
var router = express.Router()

var passport = require('passport')
var jwt = require('jsonwebtoken')

// import the database handle
var db = require('../config/mysql')

// import application config constants
var AppVars = require('../config/vars')

// save route
router.post('/save', function(req, res) {

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
router.post('/delete', passport.authenticate('jwt', { session: false }), function(req, res) {
   if(req.user && req.user.id == req.params.id){
       db.query(query, [ req.user.id ], function(error, result){
           if( error || result.affectedRows == 0 ) {
              req.json({ deleted: false })
           }else{
              req.json({ deleted: true })
           }
       })
   } else {
       req.json({ deleted: false })
   }
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


// check if user has a session
router.post('/has-session', passport.authenticate('jwt', { session: false }), function(req, res) {
    if(req.user) {
        res.json({ has_session: true, session_user: req.user })
    } else {
        res.json({ has_session: false })
    }
})

// log a user in
router.post('/login', passport.authenticate('local', { session: false }), function(req, res){
  let token = jwt.sign({ data: req.user.id }, AppVars.jwt.secret)
  return res.json({ token: token, user: req.user })
})

// 
module.exports = router 