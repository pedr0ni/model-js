const mysql = require('promise-mysql');
const User = require('./User');

/**
 * 
 * Class by example
 */

mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
}).then((connection) => {
    
    let user_model = new User(connection);

    console.log("[INFO] Application started.");
    user_model.create({id: 10});
    
});

