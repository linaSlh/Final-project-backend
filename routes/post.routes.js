

// module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const post = require("../models/Post.model");
const comment = require("../models/Comment.model");

//  POST /api/posts  -  Creates a new post
router.post("/posts", (req, res, next) => {
  const { title, content,region} = req.body;
console.log(req.payload._id);
  post.create({ title, content, region, author:req.payload._id, })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating the post", err);
      res.status(500).json({ message: "Error while creating the post" });
    });
});

//  GET /api/posts -  Retrieves all of the posts
router.get("/posts", (req, res, next) => {
  post.find()
    populate("comment")
    .then((allposts) => res.json(allposts))
    .catch((err) => {
      console.log("Error while getting the postss", err);
      res.status(500).json({ message: "Error while getting the posts" });
    });
});

//  GET /api/posts/:postId -  Retrieves a specific post by id
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each post document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  post.findById(postId)
    populate("comment")
    .then((post) => res.status(200).json(post))
    .catch((err) => {
      console.log("Error while retrieving the post", err);
      res.status(500).json({ message: "Error while retrieving the post" });
    });
});

// PUT  /api/posts/:postId  -  Updates a specific post by id
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

// DELETE  /api/posts/:postId  -  Deletes a specific post by id
router.delete("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  post.findOneAndDelete({ _id: postId })
    .then(() =>
      res.json({
        message: `post with ${postId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("Error while deleting the post", err);
      res.status(500).json({ message: "Error while deleting the post" });
    });
});

module.exports = router;