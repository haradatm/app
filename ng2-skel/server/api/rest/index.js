'use strict';

const express = require('express');
const router = express.Router();

// /* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });

const controller = require('./rest.controller');

router.get('/',  controller.index);
router.post('/', controller.index);

module.exports = router;
