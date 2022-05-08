import axios from "axios"
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, LOGOUT_SUCCESS } from  "../types/authType"

export const userRegister = (data) => {
    return async (dispatch) => {

        const config = { 
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await axios.post("/api/messenger/user-register", data, config)
            
            localStorage.setItem("authToken", response.data.token)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error
                }
            })
        }
    }
}

export const userLogin = (data) => {
    return async (dispatch) => {

        const config = { 
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await axios.post("/api/messenger/user-login", data, config)

            localStorage.setItem("authToken", response.data.token)

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
            
        } catch (error) {
            console.log(error.response.data)
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: {
                    error: error.response.data.error
                }
            })
        }
    }
}

export const userLogOut = () => async(dispatch) => {
    try {
        const response = await axios.post("/api/messenger/user-logout")
        if(response.data.success) {
            localStorage.removeItem("authToken")
            dispatch({
                type: LOGOUT_SUCCESS
            }) 
        }
    } catch (error) {
        
    }
} 