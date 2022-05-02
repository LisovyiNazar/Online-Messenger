import React, { useEffect, useState, useRef } from "react"
import RigthSide from "./RightSide/RightSide"
import { useDispatch, useSelector } from "react-redux"
import { getFriends, messageSend, getMessage, imageMessageSend } from "../../store/actions/messengerAction" 
import { Link } from "react-router-dom"
// leftside
import { BsThreeDots } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import ActiveFrind from "../Messenger/ActiveFriend/ActiveFriend"
import Friends from "./Friends/Friends"

const Messenger = () => {
    const scrollRef = useRef()
    const { friends, message } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)
    
    const [ currentFriend, setCurrentFriend ] = useState("")
    const [ newMessage, setNewMessage ] = useState("")

    const dispatch = useDispatch()

    const inputHandle = (e) => {
        setNewMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        const data = {
            senderName : myInfo.userName,
            reseverId : currentFriend.id,
            message: newMessage?newMessage:"❤️"
        }
        dispatch(messageSend(data))
    }

    const emojiSend = (emoji) => {
        setNewMessage(`${newMessage}`+emoji)
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
        }
    }

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    useEffect(() => {
        if(friends && friends.length > 0){
            setCurrentFriend(friends[0])
        }
    }, [friends])
    
    useEffect(() => {
        dispatch(getMessage(currentFriend.id))
    }, [currentFriend?.id])
    
    useEffect(() => {
        scrollRef.current ?.scrollIntoView({behavior:"smooth"})
    }, [message])
    
    return (
        <div>
            <div className="messenger">
                <input type="checkbox" id="friends"/>
                <div className="row">
                    <div className="col-3">
                        <div className="left-side">
                            <div className="top">
                                <div className="image-name">
                                    <div className="image">
                                        <img src={`/image/${myInfo.image}`} alt="" />
                                    </div>
                                    <div className="name">
                                        <h3>{myInfo.userName}</h3>
                                    </div>
                                </div>
                                <div className="icons">
                                    <div className="icon">
                                        <BsThreeDots/>
                                    </div>
                                    <div className="icon">
                                        <FaEdit></FaEdit>
                                    </div>
                                </div>
                            </div>
                            <div className="friend-search">
                                <div className="search">
                                    <button><BiSearch/></button>
                                    <input type="text" placeholder="search" className="form-control" />
                                </div>
                            </div>
                            <div className="active-friends">
                                <ActiveFrind/>
                            </div>
                            <div className="friends">
                            <label htmlFor="friends">
                                {               
                                    friends && friends.length > 0 ? friends.map ((fd,i) => 
                                        <div onClick={()=>setCurrentFriend(fd)}
                                        className={currentFriend.id === fd.id?"hover-friend active":"hover-friend"} 
                                        key={i}>
                                                <Friends friend = {fd}/>
                                        </div>
                                    ):""
                                }
                            </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                    {
                        currentFriend?<RigthSide 
                            currentFriend = {currentFriend}
                            inputHandle = {inputHandle}
                            newMessage = {newMessage}
                            sendMessage = {sendMessage}
                            message = {message}
                            scrollRef = {scrollRef}
                            emojiSend = {emojiSend}
                            imageSend = {imageSend}
                        /> :
                        <div className="login">
                            <div className="text">
                                For start using messenger
                            </div>
                            <div className="text">
                                <span><Link to="/messenger/register">Register Your Account</Link></span> 
                            </div>
                            <div className="text">
                                If You Already Have an accounr 
                            </div>
                            <div className="text">
                                <span><Link to="/messenger/login">Please LogIn</Link></span> 
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