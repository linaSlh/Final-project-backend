const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
type: mongoose.Schema.Types.ObjectId,

    ref: 'User',

  },
  region: {
    type:String,
    enum :["europe", "asia", "africa", "northAmerica", "southAmerica", "oceania"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post
