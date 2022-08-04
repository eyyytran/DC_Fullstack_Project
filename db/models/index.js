'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const db = {}

const config = process.env.DB_CONFIG
    ? JSON.parse(process.env.DB_CONFIG)
    : require(__dirname + '/../config/config.json')[env]
const username = process.env.DB_USERNAME || config.username
const password = process.env.DB_PASSWORD || config.password
const database = process.env.DB_DATABASE || config.database

const sequelize = new Sequelize(database, username, password, config)

console.log({
    config,
    username,
    password,
    database,
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
})

// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config?.use_env_variable], config)
// } else {
//     sequelize = new Sequelize(
//         process.env.DB_DATABASE || config.database,
//         process.env.DB_USERNAME || config.username,
//         process.env.DB_PASSWORD || config.password,
//         process.env.DB_CONFIG || config
//     )
// }

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        )
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        )
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
