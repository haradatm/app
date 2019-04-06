'use strict';

const mongoose = require('mongoose');
const events = require('./user.events');

const UserSchema = new mongoose.Schema({
  userId: String,
  userType: String,
  initial: String,
  name: String
});

events.registerEvents(UserSchema);
module.exports = mongoose.model('User', UserSchema);
