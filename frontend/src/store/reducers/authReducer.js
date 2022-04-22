import { REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL} from  "../types/authType"
import deCodeToken from  "jwt-decode"

const authState = {
    loading: true,
    authenticate : false,
    error: "",
    successMessage: "",
    myInfo: ""
}

const tokenDecode = (token) => {
    const tokenDecoded = deCodeToken(token)
    const expTime = new Date(tokenDecode.exp*1000)
    if(new Date()>expTime) {
        return null
    }
    return tokenDecoded
}

const getToken = localStorage.getItem("authToken")

if(getToken) {
    const getInfo = tokenDecode(getToken)
    if(getInfo) {
        authState.myInfo = getInfo
        authState.authenticate = true
        authState.loading = false
    }
}

export const authReducer = (state = authState, action) => {
    const {payload, type} = action
    
    if(type === REGISTER_FAIL || type === USER_LOGIN_FAIL) {
        return {
            ...state,
            authenticate: false,
            myInfo: "",
            loading: true,
            error: payload.error
        }
    }
    
    if(type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS) {
        const myInfo = tokenDecode(payload.token)
        return {
            ...state,
            myInfo : myInfo,
            successMessage: payload.successMessage,
            authenticate: true,
            loading: false,
            error: ""
        }
    }
    
    if(type === SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            successMessage: ""
        }
    }

    return state
}
