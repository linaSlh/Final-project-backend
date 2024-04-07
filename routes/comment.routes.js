

// module.exports = router;
 
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

// POST /api/posts/:postId/comments  -  Creates a new comment for a specific post
router.post("/posts/:postId/comments", (req, res, next) => {
  const { yourcomment } = req.body;
  const { postId } = req.params;

  // Check if the post ID is valid
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  // Check if the post exists
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Create a new comment associated with the post
      return Comment.create({ yourcomment, author: req.payload._id, post: postId })
        .then((newComment) => {
          // Update the post to include the newly created comment
          return Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } }, { new: true })
            .then((updatedPost) => res.json(updatedPost))
            .catch((err) => {
              console.log("Error while updating the post with new comment", err);
              res.status(500).json({ message: "Error while updating the post with new comment" });
            });
        });
    })
    .catch((err) => {
      console.log("Error while creating the comment", err);
      res.status(500).json({ message: "Error while creating the comment" });
    });
});

module.exports = router;