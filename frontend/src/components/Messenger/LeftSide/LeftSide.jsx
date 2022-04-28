import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import ActiveFrind from "./ActiveFriend/ActiveFriend"
import Friends from "./Friends/Friends"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../../store/actions/messengerAction" 

const LeftSide = () => {

    const { friends } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)
    
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getFriends())
    }, [])
    return (
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
                {
                    friends && friends.length > 0 ? friends.map (fd => 
                        <div className="hover-friend">
                            <Friends friend = {fd} />
                        </div>
                    ):"no friend"
                }
            </div>
        </div>
    </div>
    )
}

export default LeftSide