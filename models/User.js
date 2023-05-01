const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({_id: this._id, admin: this.admin, moderator: this.moderator}, process.env.JWT_SEC)
}

module.exports = mongoose.model('User', userSchema)