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
                    <img src={currentFriend.image} alt="" />
                </div>
                    {
                        activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === currentFriend.id) ? <div className="active-user">Active</div> : ""
                    }
                <div className="name">
                    <h4>{currentFriend.userName}</h4>
                </div>
            </div>
            <div className="others">
                <label htmlFor="gallary">
                    <div className="media">
                        <h3>Shared Media</h3>
                        <BsChevronDown/>
                    </div>
                </label>
            </div>
            <div className="gallary">
                {
                    gallery && gallery.length > 0 ? gallery.reverse().map((image, i) => 
                        gallery ? 
                        <img src={image.image} alt="" key={i} /> : ""
                    ) : ""
                }
            </div>
        </div>
    )
}

export default FriendInfo