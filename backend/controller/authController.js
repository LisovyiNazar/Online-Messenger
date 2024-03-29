const formidable = require("formidable")
const validator = require("validator")
const registerModel = require("../models/authModel.js")
const fs = require("fs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
  cloud_name: "dzsszdyew", 
  api_key: "574779741794487", 
  api_secret: "858AAbYhQw6hIIC2rH3uPjEFUcg" 
})

module.exports.userRegister = async (req, res) => {
    const form = formidable()
    form.parse(req, async (err, fields, files) => {
        const { userName, email, password, confirmPassword } = fields
        const { image } = files

        const error = []
        if(!userName) {
            error.push("please provide user name")
        }
        if(!email) {
            error.push("please provide your email")
        }
        if(email && !validator.isEmail(email)) {
            error.push("please provide your valid email")
        }
        if(!password) {
            error.push("please provide your password")
        }
        if(!confirmPassword) {
            error.push("please provide your confirm password")
        }
        if(password && confirmPassword && password !== confirmPassword) {
            error.push("your passwords aren't same")
        }
        if(password && password.length < 6) {
            error.push("your passwords must be more than 6 cahrecters")
        }
        if(Object.keys(files).length === 0) {
            error.push("please provide user image")
        }
        if(error.length>0) {
            res.status(400).json({errorMessage:error})
        } else {
            const getImagePath = image.filepath
            try {
                const checkUser = await registerModel.findOne({ 
                    where: {
                        email: email
                    }
                }).then((checkUser) => {
                    if(checkUser) {
                        res.status(404).json({error:{errorMessage:["Your email already exited"]}})
                    } else {
                        cloudinary.uploader.upload(getImagePath, async (error, result) => {
                            if(!error) {
                                const userCreate = await registerModel.create({
                                    userName,
                                    email,
                                    password: await bcrypt.hash(password, 10),
                                    image: result.url
                                })
    
                                const token = jwt.sign({
                                    id: userCreate.id,
                                    email: userCreate.email,
                                    userName: userCreate.userName,
                                    image: userCreate.image,
                                    registerTime: userCreate.createAt
                                }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXP})
    
                                const options = {
                                    expires: new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000)
                                }
                                
                                res.status(201).cookie("authToken", token, options).json({
                                    successMessage: "Your registration successfull",
                                    token
                                })
                            } else  {
                                res.status(404).json({error:{errorMessage:["Internal server error"]}})
                            }
                        })
                    }
                })
            } catch(error) {
                res.status(404).json({error:{errorMessage:["Internal server error"]}})
            }
        }
    })
}

module.exports.userLogin = async (req, res) => {
    
    const {email, password} = req.body
    
    const error = []
    if(!email) {
        error.push("please provide your email")
    }
    if(email && !validator.isEmail(email)) {
        error.push("please provide your valid email")
    }
    if(!password) {
        error.push("please provide your password")
    }
    if(error.length > 0) {
        res.status(404).json({error:{errorMessage:error}})
    } else {
        try {
            const checkUser = await registerModel.findOne({ 
                where: {
                    email: email 
                }
            })

            if(checkUser) {
                const matchPassword = await bcrypt.compare(password, checkUser.password)
    
                if(matchPassword) {
                    const token = jwt.sign({
                        id: checkUser.id,
                        email: checkUser.email,
                        userName: checkUser.userName,
                        image: checkUser.image,
                        registerTime: checkUser.createAt
                    }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXP})
    
                    const options = {
                        expires: new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000)
                    }
                    
                    res.status(201).cookie("authToken", token, options).json({
                        successMessage: "Your login successfull",
                        token
                    })
                } else {
                    res.status(404).json({error:{errorMessage:["Your password not valid"]}})
                }
            } else {
                res.status(404).json({error:{errorMessage:["Your email not found"]}})
            }

        } catch (error) {
            res.status(404).json({error:{errorMessage:["Internal server error"]}})
        }
    }
}

module.exports.userLogout = async (req, res) => { 
    res.status(201).cookie("authToken", "").json({
        success: true,
    })
}