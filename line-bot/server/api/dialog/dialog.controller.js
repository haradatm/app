'use strict';

var _ = require('lodash');
var request = require('request');

console.log('understandings api start');

// 発話理解
var understandings = function(text, context, callback) {
  console.log('understandings: ' + text);
  var APP_NAME  = 'HARADATM3'
  var API_KEY   = '583055644d503937794e446834707247646d586947534948486a6d2e6c514e6b495242636746615a2e732f';
  var ENDPOINT  = 'https://api.apigw.smt.docomo.ne.jp/sentenceUnderstanding/v1/task?APIKEY=' + API_KEY;
  var request_data = {
    projectKey: 'OSU',
    appInfo: {
      appName: APP_NAME,
      appKey : API_KEY
    },
    clientVer: '1.0.0',
    dialogMode: 'on',
    language: 'ja',
    userId: '',
    location: {
      lat: '',
      lon: ''
    },
    userUtterance: {
      utteranceText: text
    }
  };
  var options = {
    url: ENDPOINT,
    body: JSON.stringify(request_data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  request.post(options, function(err, response, body) {
    if (! err) {
      var parse_body = JSON.parse(body);
      var command = parse_body.dialogStatus.command.commandName;
      callback(command, text, context);
    }
    else {
      console.log('error:' + err.message);
      res.status(500);
    }
  });
};

// Q&A
var qanda = function(q, callback) {
  console.log('qanda: ' + q);
  var APP_NAME  = 'HARADATM3'
  var API_KEY   = '583055644d503937794e446834707247646d586947534948486a6d2e6c514e6b495242636746615a2e732f';
  var ENDPOINT  = 'https://api.apigw.smt.docomo.ne.jp/knowledgeQA/v1/ask?APIKEY=' + API_KEY + '&q=' + encodeURIComponent(q);
  var options = {
    url: ENDPOINT,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  request.get(options, function(err, response, body) {
    if (! err) {
      var parse_body = JSON.parse(body);
      var ans = parse_body.message.textForDisplay;
      callback(ans);
    }
    else {
      console.log('error:' + err.message);
      res.status(500);
    }
  });
};

// 天気
var weather = function(city, callback) {
  console.log('weather: ' + city);
  var ENDPOINT = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + city;
  var options = {
    url: ENDPOINT,
    headers: {}
  }
  request.get(options, function(err, response, body) {
    if (! err) {
      var parse_body = JSON.parse(body);
      var text = parse_body.description.text;
      text = text.replace(/\r?\n/g, ' ')
      callback(text);
    }
    else {
      console.log('error:' + err.message);
      res.status(500);
    }
  });
};

// 雑談
var dialogue = function(text, context, callback) {
  console.log('dialogue: ' + text);
  var APP_NAME  = 'HARADATM3'
  var API_KEY   = '583055644d503937794e446834707247646d586947534948486a6d2e6c514e6b495242636746615a2e732f';
  var ENDPOINT  = 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=' + API_KEY;
  var request_data = {
    utt: text,
    context: context,
    nickname: 'シェパ',
    nickname_y: 'しぇぱ',
    sex: '女',
    bloodtype: 'B',
    birthdateY: 1997,
    birthdateM: 5,
    birthdateD: 30,
    age: 16,
    constellations: '双子座',
    place: '東京',
    mode: 'dialog'
  };
  var options = {
    url: ENDPOINT,
    body: JSON.stringify(request_data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  request.post(options, function(err, response, body) {
    if (! err) {
      var parse_body = JSON.parse(body);
      var utt = parse_body.utt;
      var context = parse_body.context;

      console.log('after: ' + context);

      callback(utt, context);
    }
    else {
      console.log('error:' + err.message);
      res.status(500);
    }
  });
};

// Get list of dialogs
exports.index = function(req, res) {
  // res.json([]);

  var text = 'こんにちは';
  if (req.body.text !== undefined) {
    text = req.body.text;
  };

  var context = '';
  if (req.body.context !== undefined) {
    context = req.body.context;
  };

  console.log('before: ' + context);

  // 発話理解
  understandings(text, context, function(command, text, context) {
    // Q&A
    if (command === 'Q&A') {
      qanda(text, function(ans) {
        res.status(200).json({
          text: ans,
        });
      });
    }
    // 天気
    else if (command === '天気') {
      weather('130010', function(text) {
        res.status(200).json({
          text: text,
        });
      });
    }
    // 雑談
    else {
      dialogue(text, context, function(utt, context) {
        res.status(200).json({
          text: utt,
          context: context
        });
      });
    }
  });

};
