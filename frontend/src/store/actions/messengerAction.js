import axios from "axios"
import { FRIENDS_GET_SUCCESS } from "../types/messengerType"

export const getFriends = () => async(dispatch) => {
    try {
        const response = await axios.get("/api/messenger/get-friends")
        console.log(response.data)
        dispatch({
            type: FRIENDS_GET_SUCCESS,
            payload: {
                friends : response.data.friends
            }
        })
    } catch (error) {
        console.log(error.response.data) 
    }
}