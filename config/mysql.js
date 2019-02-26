// external libraries imports
var mysql = require('mysql')

// set db connection details
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mobit'
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