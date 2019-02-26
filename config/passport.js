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
        if(error || !results[0]) {
            return done(error, false)
        } // if(error || !results[0]) { .. }
        if( results[0] ){
            return done(null, results[0])
        } // if( results[0] ){ .. }
          
      }) // db.query(query, [ username, password ], function(error, results, fields){ .. })
    } // function(username, password, done) { .. }
)) // passport.use(new LocalStrategy(..))


// setup jwt authentication
passport.use(new JwtStrategy(passport_options, function(jwt_payload, done){
    console.log('passport jwt auth', jwt_payload.data )
    let user_id = jwt_payload.data 
    let query = 'select * from users where id = ?'

    db.query(query, [ user_id ], function(error, results, fields){
       
        if(error  || !results[0]){
            done(error, false)
        } // if(error  || !results[0]){ .. }
        if( results[0] ){
           done(null, results[0])
        } // if( results[0] ){ .. }

    }) // db.query(query, [ user_id ], function(error, results, fields){ .. })

})) // passport.use(new JwtStrategy(passport_options, function(jwt_payload, done){ .. })
