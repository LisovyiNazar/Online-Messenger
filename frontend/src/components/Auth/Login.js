import React, {useState} from "react"
import {Link} from "react-router-dom"
import { userLogin } from "../../store/actions/authAction"
import { useDispatch } from "react-redux"

const Login = () => {

    const dispatch = useDispatch()
    
    const [state,setState] = useState({
        email: "",
        password: "",
    })

    const inputHendle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault()
        dispatch(userLogin(state))
    }

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