const User = require("../models/authModule")
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