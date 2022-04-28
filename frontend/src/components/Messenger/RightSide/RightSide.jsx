import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoIosCall } from "react-icons/io"
import { HiDotsCircleHorizontal } from "react-icons/hi"
import Message from "./Message/Message";
import MessageSend from "./MessageSend/MessageSend";
import FriendInfo from "./FriendInfo/FriendInfo";

const RigthSide = () => {
    return (
        <div className="col-9">
            <div className="right-side">
                <input type="checkbox" id="dot" />
                <div className="row">
                    <div className="col-8">
                        <div className="message-send-show">
                            <div className="header">
                                <div className="image-name">
                                    <div className="image">
                                        <img src="./image/photo_2021-09-23_14-55-05.jpg" alt="" />
                                        <div className="active-icon"></div>
                                    </div>
                                    <div className="name">
                                        <h3>Nazar</h3>
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
                            <Message/>
                            <MessageSend/>
                        </div>
                    </div>
                    <div className="col-4">
                        <FriendInfo/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RigthSide