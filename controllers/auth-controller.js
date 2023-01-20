const mongoose = require('mongoose')
 const User = require("../model/user");
const bcrypt = require ('bcryptjs')
//const nodemailer = require ('nodemailer')
const jwt = require ('jsonwebtoken')
const multer = require('multer')
exports.signin = function (req, res) {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(422).json({error: "please add email or password"})
    }

    console.log(email)
    User.findOne({email:email})
    .then(User => {
        /*if(savedUser!==null){
            console.log(savedUser)
            return res.status(422).json({error: "user not exist"})
        }*/
        bcrypt.compare(password,User.password)
        .then(doMatch => {
            if(doMatch){
                
                const token = jwt.sign({ User}, process.env.jwtSecret, {
                    expiresIn: '45m',
                })
                res.status(201).json({ token})
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
            return res.status(420).json({error:"user already exits with that email"})
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
                const token = jwt.sign({ _id:user._id}, process.env.jwtSecret, {
                    expiresIn: '45m',
                })
                res.status(201).json({user, token})
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

exports.uploadImage = async (req, res) => {
    const file = req.file;
    const userId = req.body.userId ;
    console.log(file);
    console.log(userId);
    let user = null ;
    if(userId === undefined)  return res.status(400).json({msg : "please provide userId"});
    try{
        user = await User.findById(userId);
    }catch(e) {
        return res.status(400).json({msg : "user not found"});
    }
    
    if (!file) {
       return res.status(400).json({ message: 'Please upload a file.' });
    }

    user.image = file.filename ;
    console.log(user.image)
    user.save()
    return res.json({ msg: 'File and user update successfully.', user});
   
  };