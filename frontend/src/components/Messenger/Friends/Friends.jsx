import React from "react"
import moment from "moment"

const Friends = (props) => {
    const { friendInfo, messageInfo } = props.friend
    const myId = props.myId
    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={`./image/${friendInfo.image}`}  alt=""/>
                </div>
            </div>
            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4>
                        {
                            messageInfo && messageInfo.senderId === myId ? <span>you</span> : <span>{friendInfo.userName}</span>
                        }
                    </h4>
                    <div className="msg-time">
                        
                        {
                            messageInfo.message && messageInfo.message.length > 10 ? <span>{`${messageInfo.message.slice(0, 10)}...`}</span> : <span>{messageInfo.message}</span> 
                        }
                        {
                            messageInfo.image === "" ? "" : "send an image" 
                        }
                        <span>{messageInfo ? moment(messageInfo.createdAt).startOf("mini").fromNow() : moment(friendInfo.createdAt).startOf("mini").fromNow()}</span>
                    </div>
                </div>
            </div>
            {
                myId === messageInfo?.senderId ? 
                <div className="seen-unseen-icon">
                    <img src={`./image/${friendInfo.image}`}  alt=""/>
                </div> : 
                <div className="seen-unseen-icon">
                    <div className="seen-icon">

                    </div>
                </div>
            }
        </div>
    )
}

export default Friends