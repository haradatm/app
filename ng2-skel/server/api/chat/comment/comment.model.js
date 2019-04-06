'use strict';

const mongoose = require('mongoose');
const events = require('./comment.events');

const CommentSchema = new mongoose.Schema({
  user: {
    userId: String,
    userType: String,
    initial: String,
    name: String
  },
  message: {
    messageId: String,
    messageType: String,
    content: String,
    replyToken: String,
    timestamp: Date,
    answer: String
  },
  replyToId: String
});

events.registerEvents(CommentSchema);
module.exports = mongoose.model('Comment', CommentSchema);
