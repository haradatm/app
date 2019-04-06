'use strict';

var _ = require('lodash');

// Get list of transs
exports.index = function(req, res) {
  // res.json([]);

  var MsTranslator = require('mstranslator');

  // Second parameter to constructor (true) indicates that
  // the token should be auto-generated.
  var client = new MsTranslator({
    client_id: "haradatm-001",
    client_secret: "K3wGXTiZ5l/8SwU7JM+0Uc9FGEr4IIv5TSNbPtAqcD4="
  }, true);

  // var params = {
  //   text: 'How\'s it going?',
  //   from: 'en',
  //   to: 'ja'
  // };
  var data = req.body;

  // Don't worry about access token, it will be auto-generated if needed.
  client.translate(data, function(err, translated) {
    if (err) {
      console.log('error:' + err.message);
      res.status(500);
    }
    else {
      data.translated = translated;
      res.status(200).json(data);
    }
  });
};
