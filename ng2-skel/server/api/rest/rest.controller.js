/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rest              ->  index
 */

'use strict';

// Gets a list of LineBots
// export function index(req, res) {
//   res.json([]);
// }

const request = require('request');

console.log('REST API server start');

// Get list of rests
exports.index = function(req, res) {
  // res.json([]);

  console.log(req.body);

  if (process.env.FIXIE_URL !== undefined) {
    console.log(process.env.FIXIE_URL)
    request = request.defaults({'proxy': process.env.FIXIE_URL});
  }

  var method = req.body.method;
  var url = req.body.url;
  var request_data = req.body.payload;

  var options = {
    url: url,
    headers: {
      'Content-Type' : 'application/json',
    },
    strictSSL: false,
  };

  if (method.toLowerCase() === 'get') {
    options.qs = request_data;

    request.get(options, function(err, response, body) {
      if (! err) {
        res.status(200).json(body);
      }
      else {
        console.log('error: ' + err.message);
        res.status(500);
      }
    });
  }

  else {
    options.body = request_data;

    request.post(options, function(err, response, body) {
      if (! err) {
        res.status(200).json(body);
      }
      else {
        console.log('error: ' + err.message);
        res.status(500);
      }
    });
  }
};
