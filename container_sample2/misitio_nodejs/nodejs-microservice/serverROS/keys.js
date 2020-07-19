module.exports = {

    database: {
        connectionLimit: 10,
        host: process.env.MYSQL_HOST ||'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'student',
        database:  process.env.MYSQL_DATABASE || 'robotnikdb'
    }

};