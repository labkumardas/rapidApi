'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'bpivd',
  password: 'cG8IgdD_1I27dEQnX7beLph5x4a9C03VC5',
  database: 'rapidcricketline',
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log('Database Connected!');
});
module.exports = dbConn;
