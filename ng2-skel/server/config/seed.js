/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

const Commnet = require('../api/chat/comment/comment.model');
const User = require('../api/chat/user/user.model');

function seedDatabaseIfNeeded() {

  Commnet.find({}).remove()
    .then(() => {
      Commnet.create(
        { user: { userId: 'U00ac82f5903d14a14c1b2ceac99a7b2a', userType: 'user', initial: 'L', name: 'LINE' }, message: { messageId: '1234', messageType: 'text', content: 'LINE の1つ目のコメントです。', replyToken: '', timestamp: new Date(), answer: ''}, replyToId: '' },
        { user: { userId: 'U00ac82f5903d14a14c1b2ceac99a7b2a', userType: 'user', initial: 'L', name: 'LINE' }, message: { messageId: '1234', messageType: 'text', content: 'LINE の2つ目のコメントです。', replyToken: '', timestamp: new Date(), answer: ''}, replyToId: '' },
        { user: { userId: 'human', userType: 'human', initial: '有人', name: 'あなた' }, message: { messageId: '1234', messageType: 'text', content: 'あなた の1つ目のコメントです。', replyToken: '', timestamp: new Date(), answer: ''}, replyToId: '' },
        { user: { userId: 'U00ac82f5903d14a14c1b2ceac99a7b2a', userType: 'user', initial: 'L', name: 'LINE' }, message: { messageId: '1234', messageType: 'text', content: 'LINE の3つ目のコメントです。', replyToken: '', timestamp: new Date(), answer: ''}, replyToId: '' },
        { user: { userId: 'human', userType: 'human', initial: '有人', name: 'あなた' }, message: { messageId: '1234', messageType: 'text', content: 'あなた の2つ目のコメントです。', replyToken: '', timestamp: new Date(), answer: ''}, replyToId: '' }
      )
      .then(() => {
        console.log('finished populating comments');
      });
    });

  User.find({}).remove()
    .then(() => {
      User.create(
        {
          userId: 'human',
          userType: 'human',
          initial: '有人',
          name: 'あなた'
        },
        {
          userId: 'U00ac82f5903d14a14c1b2ceac99a7b2a',
          userType: 'user',
          initial: 'L',
          name: 'LINE'
        }
      )
      .then(() => {
        console.log('finished populating users');
      });
    });
}

module.exports = seedDatabaseIfNeeded;
