const {model, Shema, Schema} = require("mongoose")

const registerSchema = new Schema({
    userName: {
        type: String,
        reqired: true
    },
    email: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        reqired: true
    },
    image: {
        type: String,
        reqired: true
    },
}, {timestamps: true})

module.exports = model('user', registerSchema)