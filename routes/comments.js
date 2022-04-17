const express = require('express');
const router = express.Router();
const Comment = require('../model/Comment');

//get back all the comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    }
    catch (err) {
        res.json({message: err});
    }
});

//get specific user
router.get('/:commentId', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    }
    catch (err){
        res.json({message: err});
    }
  });

//submit a comment
router.post('/post', async (req, res) => {
    const comment = new Comment({
        authorId: req.body.authorId,
        subject: req.body.subject,
        message: req.body.message,
        placeId: req.body.placeId,
    });
        try {
            const savedComment = await comment.save();
            res.json(savedComment);
        }
        catch(err){
            res.json({message: err});
        }
});

//remove selected comment
router.delete('/delete/:commentId', async (req, res) => {
    try{
        const removedComment = await Comment.remove({ _id: req.params.commentId });
        res.json(removedComment);
    }
    catch (err){
        res.json({message: err});
    }
  });

module.exports = router;