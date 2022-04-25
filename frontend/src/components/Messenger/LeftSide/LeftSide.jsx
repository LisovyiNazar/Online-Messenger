import React from "react";
import { BsThreeDots } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import ActiveFrind from "./ActiveFriend/ActiveFriend"
import Friends from "./Friends/Friends"

const LeftSide = () => {
    return (
    <div className="col-3">
        <div className="left-side">
            <div className="top">
                <div className="image-name">
                    <div className="image">
                        <img src="/image/photo_2021-09-23_14-55-05.jpg" alt="" srcset="" />
                    </div>
                    <div className="name">
                        <h3>Nazar</h3>
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
                <div className="hover-friend active">
                    <Friends/>
                </div>
                <div className="hover-friend">
                    <Friends/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default LeftSide