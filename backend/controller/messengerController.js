const User = require("../models/authModel")
const messageModel = require("../models/messageModel")
const Serializer = require("sequelize-to-json")

module.exports.getFriends = async (req, res) => { 
    const myId = req.myId
    try {
        const friendsGet = await User.findAll().then((friendsGet) => { 
            const friendsGetJson = Serializer.serializeMany(friendsGet, User)
            const friendsGetJsonFilter = friendsGetJson.filter(d => d.id !== myId)
            res.status(200).json({success: true, friends: friendsGetJsonFilter})
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
        res.status(500).json({error:{errorMessage: "Internal server error"}})
    }
}

module.exports.messageGet = async (req, res) => {
    const myId = req.myId
    const fdId = req.params.id
    try {
        const getAllMessage = await messageModel.findAll()
        const allMessageJson = Serializer.serializeMany(getAllMessage, messageModel)
        const myMessageJson = allMessageJson.filter(m => m.senderId === `${myId}` && m.reseverId === `${fdId}`)
        const fdMessageJson = allMessageJson.filter((m => m.senderId === `${fdId}` &&  m.reseverId === `${myId}`)) 
        const getAllMessageJsonFilter = myMessageJson.concat(fdMessageJson).sort(function(a, b) {return (a.id - b.id);})
        res.status(200).json({success: true, message: getAllMessageJsonFilter})
    } catch (error) {
        res.status(500).json({error:{errorMessage: "Internal server error"}})
    }
}