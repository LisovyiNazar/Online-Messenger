import React from "react"
import { IoIosArrowDropleftCircle } from "react-icons/io"
import { BsCameraVideoFill } from "react-icons/bs"
import { IoIosCall } from "react-icons/io"
import { HiDotsCircleHorizontal } from "react-icons/hi"
import Message from "./Message/Message"
import MessageSend from "./MessageSend/MessageSend"
import FriendInfo from "./FriendInfo/FriendInfo"

const RigthSide = (props) => {
    const {currentFriend, inputHandle, newMessage, sendMessage, message, scrollRef, emojiSend, imageSend, activeUser, typingMessage, gallery} = props
    return (
    <div className="right-side">
        <input type="checkbox" id="dot"/>
        <div className="row">
            <div className="col-8">
                <div className="message-send-show">
                    <div className="header">
                        <div className="back">
                            <div className="icons">
                                <div className="icon">
                                    <label htmlFor="friends"><IoIosArrowDropleftCircle/></label>
                                </div>
                            </div>
                        </div>
                        <div className="image-name">
                            <div className="image">
                                <img src={`./image/${currentFriend.image}`} alt="" />
                                {
                                    activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === currentFriend.id) ? <div className="active-icon"></div> : ""
                                }
                            </div>
                            <div className="name">
                                <h3>{currentFriend.userName}</h3>
                            </div>
                        </div>
                        <div className="icons">
                            {/* <div className="icon">
                                <IoIosCall/>
                            </div>
                            <div className="icon">
                                <BsCameraVideoFill/>
                            </div> */}
                            <div className="icon">
                                <label htmlFor="dot"><HiDotsCircleHorizontal/></label>
                            </div>
                        </div>
                    </div>
                    <Message currentFriend={currentFriend} message = {message} typingMessage = {typingMessage} scrollRef={scrollRef}/>
                    <MessageSend 
                        inputHandle = {inputHandle}
                        newMessage = {newMessage}
                        sendMessage = {sendMessage}
                        emojiSend = {emojiSend}
                        imageSend = {imageSend}
                    />
                </div>
            </div>
            <div className="col-4">
                <FriendInfo currentFriend={currentFriend} activeUser={activeUser} gallery={gallery}/>
            </div>
        </div>
    </div>
    )
}

export default RigthSide