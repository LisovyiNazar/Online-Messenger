import React from "react";
import { BsPlusCircle } from "react-icons/bs"
import { RiGalleryLine } from "react-icons/ri"
import { BiMessageAltEdit } from "react-icons/bi"
import { AiFillGift } from "react-icons/ai"

const MessageSend = ({inputHandle, newMessage, sendMessage, emojiSend, imageSend}) =>  {

    const emojis = [
        "😄", "😁", "😆", "😅", "😂", "🤣",
        "😊", "😇", "😉","😄", "😁", "😆", 
        "😅", "😂", "🤣","😊", "😇", "😉"
    ]

    return (
        <div className="message-send-section">
            <input type="checkbox" id="emoji" />
            <div className="file">
                <BsPlusCircle title="Add Attachment"/>
            </div>
            <div className="file">
                <input onChange={imageSend} type="file" id="pic" className="form-control" />
                <label htmlFor="pic" title="Add Image"><RiGalleryLine/></label>
            </div>
            {/* <div className="file">
                <BiMessageAltEdit title="Edit Message"/>
            </div>
            <div className="file">
            <div className="add-gift hover-gift">
                    Add Gift
                </div>
                <AiFillGift title="Add Gift"/>
            </div> */}
            <div className="message-type">
                <input onChange={inputHandle} value={newMessage} type="text" name="message" id="message" className="form-control" placeholder="Type message" />
                <label htmlFor="emoji">😀</label>
            </div>
            <div onClick={sendMessage} className="file">
            ❤️
            </div>
            <div className="emoji-section">
                <div className="emoji">
                    { emojis.map((e, i) => <span onClick={() => emojiSend(e)} key={i}>{e}</span>) }
                </div>
            </div>
        </div>
    )
}

export default MessageSend