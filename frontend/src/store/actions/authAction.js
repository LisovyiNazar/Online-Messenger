import axios from "axios"

export const userRegister = (data) => {
    return async (dispatch) => {
        const config = {
            "Content-Type": "application/json"
        }
        try {
            const response = await axios.post("/api/messenger/user-register", data, config)
        } catch (error) {
            
        }
    }
}