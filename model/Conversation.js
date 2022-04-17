const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: () => { const today = new Date();  today.setHours(today.getHours() + 1); return today.toISOString();}
    },
    updatedAt: {
      type: Date,
      default: () => { const today = new Date();  today.setHours(today.getHours() + 1); return today.toISOString();}
    },
  },
);

module.exports = mongoose.model("Conversation", ConversationSchema);