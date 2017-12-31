const mysql = require('promise-mysql');
const User = require('./User');

mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
}).then((connection) => {
    
    console.log(connection);
    let user_model = new User(connection);

    console.log("[INFO] Application started.");
    user_model.find(1).then((results) => {
        console.log(results[0].user);
    });
    connection.end();
    console.log("[INFO] Connection ended.");

});

