const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

//  POST /api/comments  -  Creates a new comment
router.post("/comments", (req, res, next) => {
  const { title, description, postId } = req.body;

  Comment.create({ title, description, post: postId })
    .then((newComment) => {
      return Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the comment", err);
      res.status(500).json({ message: "Error while creating the comment" });
    });
});

module.exports = router;