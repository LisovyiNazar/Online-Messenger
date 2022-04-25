import React from "react"
import RigthSide from "./RightSide/RightSide"
import LeftSide from "./LeftSide/LeftSide"

const Messenger = () => {
    return (
        <div>
            <div className="messenger">
                <div className="row">
                    <LeftSide/>
                    <RigthSide/>
                </div>          
            </div>
        </div>
    )
}

export default Messenger