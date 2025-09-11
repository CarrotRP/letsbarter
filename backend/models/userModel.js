const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    occupation: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phonenumber: {
        type: String,
        unique: true,
        sparse: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;