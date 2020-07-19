module.exports = { //@remind config database
/** 
    database: {
        connectionLimit: 10,
        host: process.env.MYSQL_HOST ||'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'student',
        database:  process.env.MYSQL_DATABASE || 'robotnikdb'
    }
**/
    database: { 
        connectionLimit: 10,
        host: process.env.MYSQL_HOST ||'172.17.0.2',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'student',
        database:  process.env.MYSQL_DATABASE || 'robotnikdb',
        port:  process.env.MYSQL_DATABASE || 3306
    }
    
};
