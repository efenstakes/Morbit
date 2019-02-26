// import external libraries
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

// import the db instance
var db = require('./mysql')

// passport jwt options
var passport_options = {}
passport_options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
passport_options.secretOrKey = 'secret';

// setup passport local to allow authentication of users based on their name and password
passport.use(new LocalStrategy({
       usernameField: 'name',
       passwordField: 'password'
    },
    function(username, password, done) {
      let query = 'select * from users where name = ? and password = ?'
      db.query(query, [ username, password ], function(error, results, fields){
          /* if(error) {
              return done(error)
          }
          if() */
          console.log('error', error)
          console.log('results ', results)
      })
    } // function(username, password, done) { .. }
)) // passport.use(new LocalStrategy(..))


// setup jwt authentication
passport.use(new JwtStrategy(passport_options, function(jwt_payload, done){

    let user_id = jwt_payload.sub 
    let query = 'select * from users where id = ?'

    db.query(query, [ user_id ], function(error, results, fields){
       
        console.log('error', error)
        console.log('results ', results)

    }) // db.query(query, [ user_id ], function(error, results, fields){ .. })

})) // passport.use(new JwtStrategy(passport_options, function(jwt_payload, done){ .. })
