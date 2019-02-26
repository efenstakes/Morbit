// external libraries imports
var mysql = require('mysql')

// import application config constants
var AppVars = require('../config/vars')


// set db connection details
var connection = mysql.createConnection({
    host: AppVars.mysql.host,
    user: AppVars.mysql.user,
    password: AppVars.mysql.password,
    database: AppVars.mysql.database
})

// connect to the db using the set details
connection.connect(function(error){
  if( error ){
    console.log('an error occured while connecting to the db')
  }else{
    console.log('connected to db successfully')
  }
})

// export our connection
module.exports = connection 