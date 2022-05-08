import React from "react"
import { BsChevronDown } from "react-icons/bs"
import { HiDotsCircleHorizontal } from "react-icons/hi"

const FriendInfo = ({ currentFriend, activeUser, gallery }) => {
    return (
        <div className="friend-info">
            <input type="checkbox" id="gallary"/>
            <div className="back">
                <div className="icons">
                    <div className="icon">
                        <label htmlFor="dot"><HiDotsCircleHorizontal/></label>
                    </div>
                </div>
            </div>
            <div className="image-name">
                <div className="image">
                    <img src={`./image/${currentFriend.image}`} alt="" />
                </div>
                    {
                        activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === currentFriend.id) ? <div className="active-user">Active</div> : ""
                    }
                <div className="name">
                    <h4>{currentFriend.userName}</h4>
                </div>
            </div>
            <div className="others">
                <div className="custom-chat">
                    <h3>Customise Chat</h3>
                    <BsChevronDown/>
                </div>
                <div className="privacy">
                    <h3>Privacy and Support</h3>
                    <BsChevronDown/>
                </div>
                <div className="media">
                    <h3>Shared Media</h3>
                    <label htmlFor="gallary"><BsChevronDown/></label>
                </div>
            </div>
            <div className="gallary">
                {
                    gallery && gallery.length > 0 ? gallery.map((image, i) => 
                        gallery ? 
                        <img src={`./image/${image.image}`} alt="" key={i} /> : ""
                    ) : ""
                }
            </div>
        </div>
    )
}

export default FriendInfo