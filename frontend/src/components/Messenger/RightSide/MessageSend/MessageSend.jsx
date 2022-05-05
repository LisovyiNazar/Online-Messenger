import React, {useRef, useState, useEffect} from "react"
import { BsPlusCircle } from "react-icons/bs"
import { RiGalleryLine } from "react-icons/ri"
import { BiMessageAltEdit } from "react-icons/bi"
import { AiFillGift } from "react-icons/ai"

const MessageSend = ({ inputHandle, newMessage, sendMessage, emojiSend, imageSend }) =>  {

    const ref = useRef()
    const [sort, setSort] = useState(false)

    const handleOutSide = (e) => {
        if (!e.path.includes(ref.current)) {
            setSort(false)
        } 
    }

    useEffect(() => {
        document.body.addEventListener("click", handleOutSide)
        return () => document.removeEventListener("click", handleOutSide)
    }, [])

    const emojis = [
        "😀", "😁", "😃", "😅", "😄", "😁", "😆", 
        "😅", "😂", "🤣", "🥲", "😊", "😇", "🙂",
        "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", 
        "😙", "😚", "😋", "😛", "😝", "😜", "🤪"
    ]

    const handleSmileClick = (e) => {
        e.stopPropagation()
        setSort(prev => !prev)
    }

    return (
        <div className="message-send-section">
            {/* <div className="file">
                <BsPlusCircle title="Add Attachment"/>
            </div> */}
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
                <input onChange= {inputHandle } value={newMessage} type="text" name="message" id="sendMessage" className="form-control" placeholder="Type message" />
                <label onClick={ handleSmileClick }>😀</label>
            </div>
            <div onClick={sendMessage} className="file">
            ❤️
            </div>
            {sort && ( <div className="emoji-section" ref={ref}>
                 <div className="emoji">
                    { 
                        emojis.map((e, i) => <span onClick={ () => { emojiSend(e) } } key={i}>{e}</span>) 
                    }
                </div> 
                
            </div>)}
           
        </div>
    )
}

export default MessageSend