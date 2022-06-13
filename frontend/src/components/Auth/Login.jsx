import React, {useEffect, useState} from "react"
import { Link, useNavigate} from "react-router-dom"
import { userLogin } from "../../store/actions/authAction"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { SUCCESS_MESSAGE_CLEAR, ERROR_MESSAGE_CLEAR } from "../../store/types/authType"

const Login = () => {

    const alert = useAlert()
    const navigate = useNavigate()
    const { successMessage, authenticate, error} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const inputHendle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    
    const log = (authenticate) => {
        if(authenticate) {
            navigate("/")
        } else {
            console.log("sdfsdf")
        }
    }

    const login = (e) => {
        e.preventDefault()
        dispatch(userLogin(state))
    }

    
    useEffect(() => {
        if(successMessage) {
            alert.success(successMessage)
            dispatch({
                type: SUCCESS_MESSAGE_CLEAR
            })
        }
        if(authenticate){
            navigate("/")
        }
        if(error) {
            error.map(err => alert.error(err))
            dispatch({
                type: ERROR_MESSAGE_CLEAR
            })
        }
    }, [successMessage, authenticate, error])


    return (
        <div className="login">
            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={inputHendle} value={state.email} className="form-control" placeholder="nazar@gmail.com" name="email" id="email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={inputHendle} value={state.password} className="form-control" name="password" id="password"></input>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn" value="Login"></input>
                        </div>
                        <div className="form-group">
                            <span><Link to="/messenger/register">Register New Account</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login