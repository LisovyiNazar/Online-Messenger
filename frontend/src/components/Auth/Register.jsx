import React, { useState, useEffect }  from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from "../../store/actions/authAction"
import { useAlert } from "react-alert"
import { SUCCESS_MESSAGE_CLEAR, ERROR_MESSAGE_CLEAR } from "../../store/types/authType"

const Register = () => {

    const alert = useAlert();
    const navigate = useNavigate()
    const {loading, successMessage, authenticate, myInfo, error} = useSelector(state => state.auth);

    const [checked, setX] = useState(false);

    const soldCheckbox = ({ target: { checked } }) => {
        setX(checked);
    }

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
        const {userName, email, password ,confirmPassword, image} = state

        const formData = new FormData()
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("image", image);

        console.log(formData)

        if(checked === true) {
            dispatch(userRegister(formData))
        } else {
            console.log("Please Agree to Privacy Policy")
        }
        
        e.preventDefault()
    }
    
    useEffect(() => {
        if(authenticate) {
            navigate("/")
        }
       
        if(successMessage) {
            alert.success(successMessage)
            dispatch({
                type: SUCCESS_MESSAGE_CLEAR
            })
        }
        if(error) {
            error.map(err => alert.error(err))
            dispatch({
                type: ERROR_MESSAGE_CLEAR
            })
        }
    },[successMessage, error])

    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={register} method="post">
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input type="text" onChange={inputHendle} name="userName" value={state.userName} className="form-control" placeholder="Alex" id="username"></input>
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
                        <div>
                            <input type="checkbox" checked={checked} onChange={soldCheckbox} />
                            <label htmlFor="privacy">I Agree to Privacy Policy</label>
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