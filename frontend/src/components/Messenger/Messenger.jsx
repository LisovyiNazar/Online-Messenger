import React, { useEffect, useState } from "react";
import RigthSide from "./RightSide/RightSide"
import { BsThreeDots } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import ActiveFrind from "../Messenger/ActiveFriend/ActiveFriend"
import Friends from "./Friends/Friends"
import { useDispatch, useSelector } from "react-redux"
import { getFriends, messageSend } from "../../store/actions/messengerAction" 

const Messenger = () => {
    const { friends } = useSelector(state => state.messenger)
    const { myInfo } = useSelector(state => state.auth)
    
    const [ currentFriend, setCurrentFriend ] = useState("")
    const [ newMessage, setNewMessage ] = useState("")

    const inputHandle = (e) => {
        setNewMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        const data = {
            senderName : myInfo.userName,
            reseverId : currentFriend.id,
            message: newMessage?newMessage:"❤️"
        }
        dispatch(messageSend(data))
    }



    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getFriends())
    }, [])

    useEffect(() => {
        if(friends && friends.length > 0){
            setCurrentFriend(friends[0])
        }
    }, [friends])
    return (
        <div>
            <div className="messenger">
                <div className="row">
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
                                        friends && friends.length > 0 ? friends.map ((fd,i) => 
                                            <div onClick={()=>setCurrentFriend(fd)} 
                                            className={currentFriend.id === fd.id?"hover-friend active":"hover-friend"} 
                                            key={i}>
                                                <Friends friend = {fd}/>
                                            </div>
                                        ):"no friend"
                                    }
                                </div>
                            </div>
                        </div>
                    {
                        currentFriend?<RigthSide 
                            currentFriend = {currentFriend}
                            inputHandle = {inputHandle}
                            newMessage = {newMessage}
                            sendMessage = {sendMessage}
                        />:"Please select your friend"
                    }
                </div>          
            </div>
        </div>
    )
}

export default Messenger