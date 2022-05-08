import React from "react"
import { useEffect, useState, useRef } from "react"
import RigthSide from "./RightSide/RightSide"
import { useDispatch, useSelector } from "react-redux"
import { getFriends, messageSend, getMessage, imageMessageSend } from "../../store/actions/messengerAction" 
import { Link } from "react-router-dom"
import { io } from "socket.io-client"
import { SOCKET_MESSAGE } from "../../store/types/messengerType"
import toast, { Toaster } from "react-hot-toast"
import useSound from "use-sound"
import notificationSound from "../../audio/getMessage.mp3"
import sendindSound from "../../audio/sendMessage.mp3"
// leftside
import { BsThreeDots } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import ActiveFrind from "../Messenger/ActiveFriend/ActiveFriend"
import Friends from "./Friends/Friends"

const Messenger = () => {
    const [notificationAudio] = useSound(notificationSound)
    const [sendingAudio] = useSound(sendindSound)
    const socket = useRef()
    const scrollRef = useRef()
    const { friends, message } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)
    
    const [ currentFriend, setCurrentFriend ] = useState("")
    const [ newMessage, setNewMessage ] = useState("")
    const [ activeUser, setActiveUser ] = useState("")
    const [ socketMessage, setSocketMessage ] = useState("")
    const [ typingMessage, setTypingMessage ] = useState("")

    const dispatch = useDispatch()

    const inputHandle = (e) => {
        setNewMessage(e.target.value)

        socket.current.emit("typingMessage", {
            senderId : myInfo.id,
            reseverId : currentFriend.id,
            message : e.target.value
        })
    }

    const sendMessage = (e) => {
        sendingAudio()
        e.preventDefault()
        const data = {
            senderName : myInfo.userName,
            reseverId : currentFriend.id,
            message: newMessage?newMessage:"❤️"
        }
        
        dispatch(messageSend(data))
        
        socket.current.emit("sendMessage", {
            senderId: myInfo.id,
            senderName : myInfo.userName,
            reseverId : currentFriend.id,
            message: newMessage?newMessage:"❤️",
            image: "",
            time: new Date()
        })
        socket.current.emit("typingMessage", {
            senderId : myInfo.id,
            reseverId : currentFriend.id,
            message : ""
        })
        setNewMessage("")
        dispatch(getFriends())
    }

    const emojiSend = (emoji) => {
        setNewMessage(`${newMessage}`+emoji)
        socket.current.emit("typingMessage", {
            senderId : myInfo.id,
            reseverId : currentFriend.id,
            message : emoji
        })
        dispatch(getFriends())
    }
    
    const imageSend = (e) => {
        if(e.target.files.length !== 0) {
            const imageName = e.target.files[0].name 
            const newImageName = Date.now() + imageName

            const formData = new FormData()
            formData.append("senderName", myInfo.userName)
            formData.append("reseverId", currentFriend.id)
            formData.append("image", e.target.files[0])
            formData.append("imageName", newImageName)

            dispatch(imageMessageSend(formData))
            
            socket.current.emit("sendMessage", {
                senderId: myInfo.id,
                senderName : myInfo.userName,
                reseverId : currentFriend.id,
                message: "",
                image: newImageName,
                time: new Date()
            })
        }
        sendingAudio()
        dispatch(getFriends())
    }

    useEffect(() => {
        socket.current = io("ws://localhost:8000")
        socket.current.on("getMessage", (data) => {
            setSocketMessage(data)
        })
        socket.current.on("getTypingMessage", (data) => {
            setTypingMessage(data)
        })
    }, [])
    
    useEffect(() => {
        socket.current.emit("addUser", myInfo.id, myInfo)
    }, [])
    
    useEffect(() => {
        socket.current.on("getUser", (users) => { 
            const filterUser = users.filter(u => u.userId !== myInfo.id)
            setActiveUser(filterUser)
        })
    }, [])

    useEffect(() => {
        if(socketMessage && currentFriend) {
            if(socketMessage.senderId === currentFriend.id && socketMessage.reseverId === myInfo.id) {
                dispatch({
                    type: SOCKET_MESSAGE,
                    payload: {
                        message: socketMessage
                    }
                })
            }
        }
        setSocketMessage("")
    }, [socketMessage])
    
    useEffect(() => {
        if(socketMessage) {
            notificationAudio()
            toast.success(`${socketMessage.senderName} send a new message`)
            dispatch(getFriends())
        }
    }, [socketMessage])
    
    useEffect(() => {
        if(myInfo) {
            dispatch(getFriends())
        }
    }, [])


    
    useEffect(() => {
        if(myInfo) {
            dispatch(getMessage(currentFriend.id))
        }
    }, [currentFriend?.id])
    
    useEffect(() => {
        scrollRef.current ?.scrollIntoView({behavior:"smooth"})
    }, [message])
    
    return (
        <div>
            <div className="messenger">
                <Toaster
                    position = {"top-right"}
                    reverseOrder = { false }
                    toastOptions = {{
                        style: {
                            fontSize: "18px"
                        }
                    }}

                />
                <input type="checkbox" id="friends"/>
                <div className="row">
                    <div className="col-3">
                        <div className="left-side">
                            <div className="top">
                                <div className="image-name">
                                    <div className="image">                                        
                                        <img src={`/image/${myInfo === "" ? "account-avatar.png" : myInfo.image }`} alt=""/>
                                    </div>
                                    <div className="name">
                                        <h3>{myInfo.userName}</h3> 
                                    </div>
                                </div>
                                    {
                                        myInfo ? "" : <span><Link to="/messenger/register">SingUp</Link> / <Link to="/messenger/login">SignIn</Link></span> 
                                    }
                                <div className="icons">
                                    {/* <div className="icon">
                                        <BsThreeDots/>
                                    </div>
                                    <div className="icon">
                                        <FaEdit></FaEdit>
                                    </div> */}
                                </div>
                            </div>
                            {
                                myInfo ? 
                                <div className="friend-search">
                                    <div className="search">
                                        <button><BiSearch/></button>
                                        <input type="text" placeholder="search" className="form-control" />
                                    </div>
                                </div>
                                : ""
                            }
                           
                            <div className="active-friends">
                                {
                                    myInfo && activeUser && activeUser.length > 0 ? activeUser.map((u, i) => <ActiveFrind user={u} setCurrentFriend={setCurrentFriend} key={i}/>)  : ""
                                }
                            </div>
                            <div className="friends">
                                <label htmlFor="friends">
                                    {               
                                        friends && friends.length > 0 ? friends.map ((fd, i) => 
                                            <div onClick={()=>setCurrentFriend(fd.friendInfo)}
                                            className={currentFriend.id === fd.friendInfo.id?"hover-friend active":"hover-friend"} 
                                            key={i}>
                                                    <Friends friend = {fd} myId = {myInfo.id}/>
                                            </div>
                                        ):""
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                    {
                        currentFriend ? <RigthSide 
                            currentFriend = {currentFriend}
                            inputHandle = {inputHandle}
                            newMessage = {newMessage}
                            sendMessage = {sendMessage}
                            message = {message}
                            scrollRef = {scrollRef}
                            emojiSend = {emojiSend}
                            imageSend = {imageSend}
                            activeUser = {activeUser}
                            typingMessage = {typingMessage}
                        /> : !myInfo ?
                        <div className="login">
                            <div className="text">
                                <img src="/image/chat.png" alt="" />
                            </div>
                            <div className="text">
                                For start using messenger
                            </div>
                            <div className="text">
                                <span><Link to="/messenger/register">SingUp</Link>/<Link to="/messenger/login">SignIn</Link></span> 
                            </div>
                        </div> : 
                            <div className="login">
                            <div className="text">
                                <img src="/image/chat.png" alt="" />
                            </div>
                            <div className="text">
                                Select chat for messaging
                            </div>
                        </div>
                    }
                    </div>
                </div>          
            </div>
        </div>
    )
}

export default Messenger