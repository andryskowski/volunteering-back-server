const router = require("express").Router();
const Message = require("../model/Message");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get message which is the newest

router.get("/newestmessage/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    const newMessages = messages.reduce((prev, current) => (prev.createdAt > current.createdAt) ? prev : current);
    res.status(200).json(newMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//hasread messages
router.patch("/patch/hasRead/:messageId", async (req, res) => {
  const today = new Date();
  try {
    await Message.updateOne(
      { _id: req.params.messageId },
      {
        $set: {
          receiverHasRead: true,
        },
      }
    );
    const message = await Message.findOne({ _id: req.params.messageId });
    res.json(message);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;