const Sequelize = require("sequelize")
const db = require("../config/database.js")

const { DataTypes } = Sequelize;

const registerSchema = db.define("users",{
    userName: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    image: {
        type: DataTypes.STRING,
        required: true
    },
},{
    timestamp: true
})

module.exports = registerSchema