const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        
    },
    username: {
        type: String,
        required: true
    },
    resetLink: {
        data: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    },
    image: { type: String, default:""},
    versionKey: false
})

module.exports=mongoose.model("User", userSchema)