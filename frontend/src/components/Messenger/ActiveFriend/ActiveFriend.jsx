import React from "react"

const ActiveFrind = ({user, setCurrentFriend}) => {
    return (
        <label htmlFor="friends">
            <div onClick={() => setCurrentFriend({
                id: user.userInfo.id,
                email: user.userInfo.email,
                image: user.userInfo.image,
                userName: user.userInfo.userName
            })} className="active-friend">
                <div className="image-active-icon">
                    <div className="image">
                        <img src={user.userInfo.image} alt="" />
                        <div className="active-icon"></div>
                    </div>
                </div>
            </div>
        </label>
    )
}

export default ActiveFrind