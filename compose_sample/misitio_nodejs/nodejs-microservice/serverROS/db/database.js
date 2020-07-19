const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('../config/keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  
  if (err) {
    //console.error({err});
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('[DB] Database connection was closed. [ERROR]');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('[DB] Database has to many connections [ERROR]');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('[DB] Database connection was refused [ERROR]');
    }
    if(err.code === 'EHOSTUNREACH'){
      console.error('[DB] Database connection was refused [ERROR]');
    }
    if(err.code === 'ER_ACCESS_DENIED_ERROR')
    console.error('[DB] Database connection ACCES DENIED [ERROR]');
    
  }

  if (connection){
     console.log('[DB]'.green,database.database+' IS CONNECTED');
     connection.release();
  
  }

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;