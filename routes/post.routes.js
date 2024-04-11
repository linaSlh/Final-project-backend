const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const post = require("../models/Post.model");
const comment = require("../models/Comment.model");
const User = require("../models/User.model");

// POST /api/posts - Creates a new post
router.post("/posts", (req, res, next) => {
  const { title, content, region } = req.body;
  const { _id: author } = req.payload; // Assuming req.payload contains the user information
  post.create({ title, content, region, author })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the post", err);
      res.status(500).json({ message: "Error while creating the post" });
    });
});

// GET /api/posts - Retrieves all posts
router.get("/posts", async (req, res, next) => {
  try {
    const allposts = await post.find().populate("author");
    const Ap = await Promise.all(allposts.map(async (post) => {
      const user = await User.findById(post.author);
      return { ...post, user: user.username };
    }));
    res.json(Ap);
  } catch (err) {
    console.log("Error while getting the posts", err);
    res.status(500).json({ message: "Error while getting the posts" });
  }
});

// GET /api/posts/:postId - Retrieves a specific post by id
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  post.findById(postId)
    .populate("author")
    .then((post) => res.status(200).json(post))
    .catch((err) => {
      console.log("Error while retrieving the post", err);
      res.status(500).json({ message: "Error while retrieving the post" });
    });
});

// PUT /api/posts/:postId - Updates a specific post by id
router.put("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => res.json(updatedPost))
    .catch((err) => {
      console.log("Error while updating the post", err);
      res.status(500).json({ message: "Error while updating the post" });
    });
});

// DELETE /api/posts/:postId - Deletes a specific post by id
router.delete("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  post.findOneAndDelete({ _id: postId })
    .then(() => res.json({ message: `post with ${postId} is removed successfully.` }))
    .catch((err) => {
      console.log("Error while deleting the post", err);
      res.status(500).json({ message: "Error while deleting the post" });
    });
});

module.exports = router;
