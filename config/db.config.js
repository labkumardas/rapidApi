'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host: 'rapid-api.c3mkmyfxiaka.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: '8=*?3QP3&8nT',
  database: 'rapidcricketline',
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log('Database Connected!');
});
module.exports = dbConn;

// const dbConn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: null,
//   database: 'rapidcricketline',
// });
// dbConn.connect(function (err) {
//   if (err) throw err;
//   console.log('Database Connected!');
// });
// module.exports = dbConn;
