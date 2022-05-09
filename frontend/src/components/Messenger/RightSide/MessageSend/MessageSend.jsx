import React, {useRef, useState, useEffect} from "react"
import { AiOutlineSend } from "react-icons/ai"
import { RiGalleryLine } from "react-icons/ri"

const MessageSend = ({ inputHandle, newMessage, sendMessage, emojiSend, imageSend }) =>  {
    
    const emojis = [
        "😀", "😁", "😃", "😅", "😄", "😁", "😆", 
        "😅", "😂", "🤣", "🥲", "😊", "😇", "🙂",
        "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", 
        "😙", "😚", "😋", "😛", "😝", "😜", "🤪"
    ]

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


    const handleSmileClick = (e) => {
        e.stopPropagation()
        setSort(prev => !prev)
    }

    return (
        <div className="message-send-section">
            <div className="file">
                <input onChange={imageSend} type="file" id="pic" className="form-control" />
                <label htmlFor="pic" title="Add Image"><RiGalleryLine/></label>
            </div>
            <div className="message-type">
                <input onChange={inputHandle} value={newMessage} type="text" name="message" id="sendMessage" className="form-control" placeholder="Type message" />
                <label onClick={handleSmileClick}>😀</label>
            </div>
            <div onClick={sendMessage} className="file">{<AiOutlineSend/>}</div>
            {
                sort && ( 
                <div className="emoji-section" ref={ref}>
                    <div className="emoji">
                        { 
                            emojis.map((e, i) => <span onClick={() => {emojiSend(e)}} key={i}>{e}</span>) 
                        }
                    </div> 
                </div>
                )
            }
           
        </div>
    )
}

export default MessageSend