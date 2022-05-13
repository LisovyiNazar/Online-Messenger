import React from "react"
import { useEffect, useState, useRef } from "react"
import RigthSide from "./RightSide/RightSide"
import { useDispatch, useSelector } from "react-redux"
import { getFriends, messageSend, getMessage, imageMessageSend } from "../../store/actions/messengerAction" 
import { userLogOut } from "../../store/actions/authAction"
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
import Friends from "./Friends/Friends"
import { IoIosLogOut } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const Messenger = () => {
    const [notificationAudio] = useSound(notificationSound)
    const [sendingAudio] = useSound(sendindSound)
    const socket = useRef()
    const scrollRef = useRef()
    const navigate = useNavigate()
    const { friends, message, gallery } = useSelector(state => state.messenger)
    const { myInfo, authenticate } = useSelector(state => state.auth)
    
    const [ currentFriend, setCurrentFriend ] = useState("")
    const [ newMessage, setNewMessage ] = useState("")
    const [ activeUser, setActiveUser ] = useState("")
    const [ socketMessage, setSocketMessage ] = useState("")
    const [ typingMessage, setTypingMessage ] = useState("")
    const [ hideMenu, setHideMenu ] = useState(false)

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
        dispatch(getFriends())
        setNewMessage("")
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
    
    const imageSend = async (e) => {
        sendingAudio()
        e.preventDefault()
        if(e.target.files.length !== 0) {
            const imageData = new FormData()
            imageData.append("file", e.target.files[0])
            imageData.append("upload_preset", "messengerImage")

            const response = await fetch("https://api.cloudinary.com/v1_1/dzsszdyew/image/upload", {
                method: "POST",
                body: imageData
            })

            const file = await response.json()
            console.log(file.url)

            const formData = new FormData()
            formData.append("senderName", myInfo.userName)
            formData.append("reseverId", currentFriend.id)
            formData.append("imageUrl", file.url)
            
            dispatch(imageMessageSend(formData))

            socket.current.emit("sendMessage", {
                senderId: myInfo.id,
                senderName : myInfo.userName,
                reseverId : currentFriend.id,
                message: "",
                image: file.url,
                time: new Date()
            })
            dispatch(getFriends())
        }        
    }

    const logOut = () => {
        socket.current.emit("logout")
        dispatch(userLogOut())
        navigate("/messenger/login")
    }

    const handleOutSide = (e) => {
        if (!e.path.includes(scrollRef.current)) {
            setHideMenu(false)
        } 
    }
    
    const handleMenuClick = (e) => {
        e.stopPropagation()
        setHideMenu(prev => !prev)
    }

    const search = (e) => {
        const getFriendClass = document.getElementsByClassName("friend")
        const getFriendNameClass = document.getElementsByClassName("fd-name")
        for (let i = 0; i < getFriendNameClass.length; i++) {
            const text = getFriendNameClass[i].innerHTML.toLowerCase()
            if(text.indexOf(e.target.value.toLowerCase()) > -1) {
                getFriendClass[i].style.display = ""
            } else {
                getFriendClass[i].style.display = "none"
            }
        }
    }

    useEffect(() => {
        if (!authenticate) {
            navigate("/messenger/login")
        }
    }, [])

    useEffect(() => {
        document.body.addEventListener("click", handleOutSide)
        return () => document.removeEventListener("click", handleOutSide)
    }, [])


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
                        message: socketMessage,
                        gallery: socketMessage
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
        dispatch(getFriends())
    }, [])
    
    useEffect(() => {
        dispatch(getMessage(currentFriend.id))
    }, [currentFriend?.id])
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
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
                                        <img src={myInfo.image} alt=""/>
                                    </div>
                                    <div className="name">
                                        <h3>{myInfo.userName}</h3> 
                                    </div>
                                </div>
                                <div className="icons">
                                    <div className="icon" onClick={handleMenuClick}>
                                        <BsThreeDots/>
                                    </div>
                                    <div className={hideMenu ? "theme-logout show" : "theme-logout"}>
                                        {/* <h3>Dark Mode</h3>
                                        <div className="on"><label htmlFor="dark"><input type="radio" name="theme" value="dark" /><span>ON</span></label></div>
                                        <div className="off"><label htmlFor="light"><input type="radio" name="theme" value="light" /><span>OFF</span></label></div> */}
                                        <div className="logout" onClick={logOut}>
                                            <IoIosLogOut/>
                                            <span>LogOut</span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="friend-search">
                                    <div className="search">
                                        <button><BiSearch/></button>
                                        <input onChange={search} type="text" placeholder="search" className="form-control" />
                                    </div>
                                </div>
                            <div className="friends">
                                <label htmlFor="friends">
                                    {               
                                        friends && friends.length > 0 ? friends.map ((fd, i) => 
                                            <div onClick={()=>setCurrentFriend(fd.friendInfo)}
                                            className={currentFriend.id === fd.friendInfo.id?"hover-friend active":"hover-friend"} 
                                            key={i}>
                                                    <Friends friend = {fd} myId = {myInfo.id} active={activeUser}/>
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
                            gallery = {gallery}
                        /> : 
                        <div className="login">
                            <div className="text">
                                <img src="/image/chat.png" alt="" />
                            </div>
                            <span className="text">
                                Select chat for messaging
                            </span>
                        </div>
                    }
                    </div>
                </div>          
            </div>
        </div>
    )
}

export default Messenger