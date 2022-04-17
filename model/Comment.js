const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    authorId: String,
    subject: String,
    message: String,
    date: {
        type: Date,
        default: () => { const today = new Date();  today.setHours(today.getHours() + 1); return today.toISOString();}
    },
    placeId: String,
});

module.exports = mongoose.model('Comment', commentSchema);
