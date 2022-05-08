const { userInfo } = require("os")

const io = require("socket.io")(8000, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
})

let users = []

const addUser = (userId, socketId, userInfo) => {
    const checkUser = users.some(u => u.userId === userId)
    if(!checkUser) {
        users.push({userId, socketId, userInfo})
    }
}

const userRemove = (socketId) => {
    users = users.filter(u => u.socketId !== socketId)
}

const findFriend = (id) => {
    return users.find(u => u.userId === id)
}

io.on("connection", (socket) => {
    console.log("user is connected......")
    socket.on("addUser", (userId, userInfo) => {
        if(userId) {
            addUser(userId, socket.id, userInfo)
            io.emit("getUser", users)
        }
    })

    socket.on("sendMessage", (data) => {
        const user = findFriend(data.reseverId)
        if(user !== undefined) {
            socket.to(user.socketId).emit("getMessage", {
                senderId: data.senderId,
                senderName: data.senderName,
                reseverId: data.reseverId,
                createAt: data.time,
                message: data.message,
                image: data.image
            })
        }
    })

    socket.on("typingMessage", (data) => {
        const user = findFriend(data.reseverId)
        if(user !== undefined) {
            socket.to(user.socketId).emit("getTypingMessage", {
                senderId: data.senderId,
                reseverId: data.reseverId,
                message: data.message
            })
        }
    })

    socket.on("disconnect", () => {
        console.log("user disconnect......")
        userRemove(socket.id)
        io.emit("getUser", users)
    })
})