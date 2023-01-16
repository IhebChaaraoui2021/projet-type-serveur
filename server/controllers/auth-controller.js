const mongoose = require('mongoose')
 const User = require("../model/user");
const bcrypt = require ('bcryptjs')
//const nodemailer = require ('nodemailer')
const jwt = require ('jsonwebtoken')

exports.signin = function (req, res) {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(422).json({error: "please add email or password"})
    }

    console.log(email)
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                
                const token = jwt.sign({ _id: savedUser._id}, process.env.jwtSecret, {
                    expiresIn: '45m',
                })
                res.status(201).json({savedUser, token})
            }
            else {
                return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err => { 
            console.log(err)})
    })
   
}

exports.add_user = function (req, res) {
    const {email,password, username} = req.body
    console.log(req.body)
    if (!username || !email || !password ) {
       return res.status(422).json({error: "please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"user already exits with that email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                username,
                email,
                password:hashedpassword,
               
            })
            user.save()
            .then(user => {
               
                res.status(201).json({message: "saved succesfully"})
            })
            .catch(error => {
                res.status(422).json({error:"can't send the email", error})
            })
        })
    })
    .catch(err => {
        console.log(err)
    })   
}
const PATH = './uploads';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
let upload = multer({
  storage: storage
});
app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    console.log(req);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})