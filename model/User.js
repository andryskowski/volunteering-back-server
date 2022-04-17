const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: () => { const today = new Date();  today.setHours(today.getHours() + 1); return today.toISOString();}
    },  
    role: {
        type: String,
        default: 'user'
    },  
    profilePhoto: {
        type: String,
        default: 'https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg'
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);
