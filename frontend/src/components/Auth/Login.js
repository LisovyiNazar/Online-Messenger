import React from "react"
import {Link} from "react-router-dom"

const Login = () => {
    return (
        <div className="login">
            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>
                <div className="card-body">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" placeholder="nazar@gmail.com" name="email" id="email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" id="password"></input>
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