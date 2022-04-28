import React from "react";
import { BsPlusCircle } from "react-icons/bs"
import { RiGalleryLine } from "react-icons/ri"
import { BiMessageAltEdit } from "react-icons/bi"
import { AiFillGift } from "react-icons/ai"

const MessageSend = () =>  {

    const emojis = [
        "😄", "😁", "😆", "😅", "😂", "🤣",
        "😊", "😇", "😉","😄", "😁", "😆", 
        "😅", "😂", "🤣","😊", "😇", "😉"
    ]
    const emojissIndex ={}

    return (
        <div className="message-send-section">
            <input type="checkbox" id="emoji" />
            <div className="file">
                <BsPlusCircle title="Add Attachment"/>
            </div>
            <div className="file">
                <input type="file" id="pic" className="form-control" />
                <label htmlFor="pic" title="Add Image"><RiGalleryLine/></label>
            </div>
            <div className="file">
                <BiMessageAltEdit title="Edit Message"/>
            </div>
            <div className="file">
            <div className="add-gift hover-gift">
                    Add Gift
                </div>
                <AiFillGift title="Add Gift"/>
            </div>
            <div className="message-type">
                <input type="text" name="message" id="message" className="form-control" placeholder="Type message" />
                <label htmlFor="emoji">😀</label>
            </div>
            <div className="file">
            ❤️
            </div>
            <div className="emoji-section">
                <div className="emoji">
                    { emojis.map((e, i) => <span key={i}>{e}</span>) }
                </div>
            </div>
        </div>
    )
}

export default MessageSend