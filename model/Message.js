const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => { const today = new Date();  today.setHours(today.getHours() + 1); return today.toISOString();}
    },
    updatedAt: {
      type: Date,
      default: () => { const today = new Date();  today.setHours(today.getHours() + 1); return today.toISOString();}
    },
    receiverHasRead: {
      type: Boolean,
      default: false
    },
  },
);

module.exports = mongoose.model("Message", MessageSchema);