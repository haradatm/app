'use strict';

const express = require('express');
const router = express.Router();

// /* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });

const controller = require('./chat.controller');

router.get('/',      controller.index);
router.post('/',     controller.create);
router.post('/send', controller.send);

const comment_controller = require('./comment/comment.controller');

router.get ('/comments', comment_controller.index);
router.post('/comments', comment_controller.create);

module.exports = router;
