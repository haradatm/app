'use strict';

var _ = require('lodash');
var request = require('request');

// Get list of rests
exports.index = function(req, res) {
  // res.json([]);

  if (process.env.FIXIE_URL !== undefined) {
    console.log(process.env.FIXIE_URL)
    request = request.defaults({'proxy': process.env.FIXIE_URL});
  }

  var method = req.body.method;
  var url = req.body.url;
  var request_data = req.body.payload;

  var options = {
    url: url,
    qs: request_data,
    headers: {
      'Content-Type' : 'application/json',
    },
    strictSSL: false,
  };
  if (method.toLowerCase() === 'get') {
    options.qs = request_data;
  }
  else {
    options.body = request_data;
  }

  request.post(options, function(err, response, body) {
    if (! err) {
      res.status(200).json(body);
    }
    else {
      console.log('error: ' + err.message);
      res.status(500);
    }
  });

};
