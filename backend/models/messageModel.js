const Sequelize = require("sequelize")
const db = require("../config/database.js")

const { DataTypes } = Sequelize

const messageSchema = db.define("messages",{
    senderId: {
        type: DataTypes.STRING,
        required: true
    },
    senderName: {
        type: DataTypes.STRING,
        required: true
    },
    reseverId: {
        type: DataTypes.STRING,
        required: true
    },
    message: {
            type: DataTypes.STRING,
            default: ""
    },
    image: {
        type: DataTypes.STRING,
        default: ""
    }
},{
    timestamp: true
})

module.exports = messageSchema