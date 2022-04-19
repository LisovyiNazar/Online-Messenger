import React, { useState }  from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userRegister } from "../store/actions/authAction"

const Register = () => {
    const [state,setstate] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    })

    const [loadImage,setLoadImage] = useState("")

    const inputHendle = (e) => {
        setstate({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const fileHendle = e => {
        if(e.target.files.lenght !== 0) {
            setstate({
                ...state,
                [e.target.name] : e.target.files[0]
            })
            console.log(e.target.files[0].name)
        }
        const reader = new FileReader()


        reader.onload = () => {
            setLoadImage(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const dispatch = useDispatch()

    const register = e => {
        e.preventDefault()
        
        const {userName, email, password ,confirmPassword, image} = state

        const formData = new FormData()
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("image", image);

        dispatch(userRegister(formData))

    }

    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input type="text" onChange={inputHendle} name="userName" value={state.userName} className="form-control" placeholder="Nazar" id="username"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={inputHendle} name="email" value={state.email} className="form-control" placeholder="nazar@gmail.com" id="email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={inputHendle} name="password" value={state.password} className="form-control" placeholder="*****" id="password"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" onChange={inputHendle} name="confirmPassword" value={state.confirmPassword} className="form-control" placeholder="*****" id="confirmPassword"></input>
                        </div>
                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">
                                    {loadImage ? <img src = {loadImage} alt=""/> : ''}
                                </div>
                                <div className="file">
                                    <label htmlFor="image">Select Image</label>
                                    <input type="file" onChange={fileHendle}  name="image" className="form-control" id="image"></input>
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