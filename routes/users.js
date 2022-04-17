const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//get back all the users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific user
router.get('/get/:userId', async (req, res) => {
  try{
      const user = await User.findById(req.params.userId);
      res.json(user);
  }
  catch (err){
      res.json({message: err});
  }
});

//delete selected user
router.delete('/delete/:userId', async (req, res) => {
  try{
      const removedUser = await User.remove({ _id: req.params.userId });
      res.json(removedUser);
  }
  catch (err){
      res.json({message: err});
  }
});

router.patch("/patch/:userId", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          profilePhoto: req.body.profilePhoto,
          name: req.body.name,
          email: req.body.email,
          description: req.body.description,
        },
      }
    );
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/patch/changeRole/:userId", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          role: req.body.role,
        },
      }
    );
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
