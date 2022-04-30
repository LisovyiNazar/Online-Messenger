const User = require("../models/authModel")
const messageModel = require("../models/messageModel")
const Serializer = require("sequelize-to-json")

module.exports.getFriends = async (req, res) => { 
    const myId = req.myId
    try {
        const friendsGet = await User.findAll().then((friendsGet) => { 
            const friendsGetParse = Serializer.serializeMany(friendsGet, User)
            const filter = friendsGetParse.filter(d => d.id !== myId)
            res.status(200).json({success: true, friends: filter})
        })
    } catch (error) {
        res.status(500).json({error:{errorMessage: "Internal server error"}})
    }
} 

module.exports.messageUploadDB = async (req, res) => {
    const {senderName, reseverId, message} = req.body
    const senderId = req.myId

    try {
        const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: message,
            image: ""
        })
        res.status(200).json({
            success: true, 
            message: {
                senderId: senderId,
                senderName: senderName,
                reseverId: reseverId,
                message: message,
                image: ""
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:{errorMessage: "Internal server error"}})
    }
}