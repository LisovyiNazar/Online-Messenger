import React from "react";
import { BsChevronDown } from "react-icons/bs"

const FriendInfo = () => {
    return (
        <div className="friend-info">
            <input type="checkbox" id="gallary"/>
            <div className="image-name">
                <div className="image">
                    <img src="./image/photo_2021-09-23_14-55-05.jpg" alt="" />
                </div>
                <div className="active-user">
                    Active
                </div>
                <div className="name">
                    <h4>Nazar</h4>
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
                <img src="./image/5.jpg" alt="" />
                <img src="./image/photo_2021-09-23_14-55-05.jpg" alt="" />
                <img src="./image/photo_2021-09-23_14-55-05.jpg" alt="" />
                <img src="./image/photo_2021-09-23_14-55-05.jpg" alt="" />
            </div>
        </div>
    )
}

export default FriendInfo