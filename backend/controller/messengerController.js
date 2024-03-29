const formidable = require("formidable")
const fs = require("fs")
const User = require("../models/authModel")
const messageModel = require("../models/messageModel")
const Serializer = require("sequelize-to-json")

module.exports.getFriends = async (req, res) => { 
    const myId = req.myId
    const friendsLastMessages = []

    try {    
        const getAllUsers = await User.findAll()
        const friendsGetJson = Serializer.serializeMany(getAllUsers, User).filter(d => d.id !== myId)

        for (let i = 0; i < friendsGetJson.length; i++) {
            const getAllMessage = await messageModel.findAll()
            
            const allMessageJson = Serializer.serializeMany(getAllMessage, messageModel)
            
            const myMessage = allMessageJson.filter(m => m.senderId === `${myId}` && m.reseverId === `${friendsGetJson[i].id}`)
            const fdMessage = allMessageJson.filter((m => m.senderId === `${friendsGetJson[i].id}` &&  m.reseverId === `${myId}`)) 
            
            const allChatMessage = myMessage.concat(fdMessage).sort(function(a, b) {return (a.id - b.id)})
            
            friendsLastMessages.push({friendInfo: friendsGetJson[i], messageInfo: allChatMessage.reverse()[0]})
        }
        res.status(200).json({success: true, friends: friendsLastMessages})
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
        const fdMessageJson = allMessageJson.filter(m => m.senderId === `${fdId}` && m.reseverId === `${myId}`) 
        
        const myPhoto = allMessageJson.filter(m => m.senderId === `${myId}` && m.image !== "")
        const fdPhoto = allMessageJson.filter(m => m.senderId === `${fdId}` && m.image !== "") 


        const getAllMessageJsonFilter = myMessageJson.concat(fdMessageJson).sort(function(a, b) {return (a.id - b.id)})
        const gallery  = myPhoto.concat(fdPhoto).sort(function(a, b) {return (a.id - b.id)})
        
        res.status(200).json({success: true, message: getAllMessageJsonFilter, gallery: gallery})
    } catch (error) {
        res.status(500).json({error:{errorMessage: "Internal server error"}})
    }
}

module.exports.imageMessageSend = async (req, res) => {
    const form = formidable()

    form.parse(req, async (err, fields, files) => { 
        const senderId = req.myId
        const { senderName, reseverId, imageUrl } = fields
        console.log(imageUrl)
        try {
            const imageMessage = {
                senderId: senderId,
                senderName: senderName,
                reseverId: reseverId,
                message: "",
                image: imageUrl
            }
            
            await messageModel.create(imageMessage)
            
            res.status(201).json({
                success: true,
                image: imageMessage
            })
        } catch (error) {
            res.status(500).json({error:{errorMessage: "Internal server error"}})
        }
    })
}