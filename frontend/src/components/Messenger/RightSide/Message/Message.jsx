import React from "react"
import { useSelector } from "react-redux"
import moment from "moment"

const Message = ({ message, currentFriend, scrollRef, typingMessage }) => {
    const { myInfo } = useSelector(state => state.auth) 
    return (
        <>
            <div className="message-show">
            {
                message && message.length > 0 ? message.map((m, i) => 
                myInfo.id == m.senderId ? 
                    <div ref={ scrollRef } key={i} className="my-message">
                        <div className="image-message">
                            <div className="my-text">
                                <div className="message-text">
                                    { m.message === "" ? <img src={m.image} alt=""/> : <p>{m.message}</p> }
                                </div>
                                <div className="time">
                                    {
                                        moment(m.createdAt).format("hh:mm a")
                                    }
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div ref={scrollRef} key={i} className="fd-message">
                        <div className="image-message-time">
                            <img src={currentFriend.image} alt="" />
                            <div className="message-time">
                                <div className="fd-text">
                                    <div className="message-text">
                                        { m.message === "" ? <img src={m.image} alt=""/> : <p>{m.message}</p> }
                                    </div>
                                    <div className="time">
                                        {
                                            moment(m.createdAt).format("hh:mm a")
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ""
            }
            </div>
            {
                typingMessage && typingMessage.message !== "" && typingMessage.senderId === currentFriend.id? 
                <div className="typing-message">
                    <div className="fd-message">
                        <div className="image-message-time">
                            <img src={currentFriend.image} alt="" />
                            <div className="message-time">
                                <div className="fd-text">
                                    <p className="message-text">Typing message...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ""
            }
        </>
    )
}

export default Message