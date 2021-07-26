const { createPool} = require('mysql');

//create here mysql connection

const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
  });

// dbConn.connect(function(error){
//     if(error) throw error;
//     console.log('db connected success');
// })

module.exports = pool;