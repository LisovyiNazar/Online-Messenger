const formidable = require("formidable")
const validator = require("validator")
const registerModel = require("../models/authModule.js")
const fs = require("fs")
const bcrypt = require("bcrypt")
const req = require("express/lib/request")
const jwt = require("jsonwebtoken")

module.exports.userRegister = async (req,res) => {
    const form = formidable()
    form.parse(req, async (err,fields,files) => {
        const {userName, email, password, confirmPassword} = fields
        const {image} = files

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
        }
        else {
            const getImageName = image.originalFilename
            const randNumber = Math.floor(Math.random()*99999) 

            const newImageName = randNumber + getImageName

            const newPath = __dirname + `../../../frontend/public/image/${image.originalFilename}`
            image.originalFilename = newImageName

            try {
                console.log(email)
                const checkUser = await registerModel.findOne({ 
                    where: {
                        email: email
                    }
                }).then((checkUser) => {
                    if(checkUser) {
                        res.status(404).json({error:{errorMessage:["Your email already exited"]}})
                    } else {
                        fs.copyFile(image.filepath, newPath, async (error) => {
                            if(!error) {
                                const userCreate = await registerModel.create({
                                    userName,
                                    email,
                                    password: await bcrypt.hash(password,10),
                                    image: image.originalFilename
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
                                    successMessege: "Your registration successfull",
                                    token
                                })
    
                                console.log(token)
                                console.log("register success")
                            } else  {
                                res.status(500).json({error:{errorMessage:["Internal server error"]}})
                            }
                        })
                    }
                })
            } catch(error) {
                console.log(error)
            }
        }

    })
}