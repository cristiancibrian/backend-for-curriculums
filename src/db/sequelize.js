const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE || 'curriculums'
})

module.exports = sequelize;