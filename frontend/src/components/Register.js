import React from "react"
import {Link} from "react-router-dom"

const Register = () => {
    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input type="text" className="form-control" placeholder="Nazar" id="username"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" placeholder="nazar@gmail.com" id="email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" placeholder="*****" id="password"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" className="form-control" placeholder="*****" id="confirmPassword"></input>
                        </div>
                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">
                                
                                </div>
                                <div className="file">
                                    <label htmlFor="image">Select Image</label>
                                    <input type="file" className="form-control" id="image"></input>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="register" className="btn"></input>  
                        </div>
                        <div className="form-group">
                            <span><Link to="/messenger/login">Login Your Account</Link></span>  
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register