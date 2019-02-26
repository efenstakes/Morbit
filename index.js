// external libraries imports
var express = require('express')
var bodyParser = require('body-parser')

// import my codes
// routes
var userRoutes = require('./routes/user')
var itemRoutes = require('./routes/item')
var bidRoutes = require('./routes/bid')

// db config
var dbConnection = require('./config/mysql')

// passport config

// initializing the application instance
var app = express()


// parse application/x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
    // Express Session
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }));

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());
*/

// set up the routes
app.use('/api/user', userRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/bid', bidRoutes)


// start the server on port 3000
app.listen(3000, function(){
    console.log('server started at 3000')
})