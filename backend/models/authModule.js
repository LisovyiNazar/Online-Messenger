const {model, Shema} = require("mongoose")

const registerSchema = new Shema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},{timestamp: true})

module.exports = model("user", registerSchema)