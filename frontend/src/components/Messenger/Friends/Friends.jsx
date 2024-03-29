import React from "react"
import moment from "moment"

const Friends = (props) => {
    const { friendInfo, messageInfo } = props.friend
    const myId = props.myId
    const active = props.active
    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={friendInfo.image} alt=""/>
                </div>
                {
                    active && active.length > 0 && active.some(u => u.userId === friendInfo.id) ? <div className="active-icon"></div> : ""
                }
            </div>
            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4>
                        {
                            messageInfo && messageInfo.senderId === myId ? "" : <span className="fd-name">{friendInfo.userName}</span>
                        }
                    </h4>
                    <div className="msg-time">
                        {
                            messageInfo ? messageInfo.message ? messageInfo.message.length > 10 ? <span>{`${messageInfo.message.slice(0, 10)}...`}</span> : <span>{messageInfo.message}</span> : <span>Send an image</span> : ""
                        }
                        <span>{messageInfo ? moment(messageInfo.createdAt).format("hh:mm a") : ""}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends