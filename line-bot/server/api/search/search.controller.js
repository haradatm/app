'use strict';

var _ = require('lodash');
var request = require('request');

console.log('search api start');

// 固有表現抽出
var entity = function(text, callback) {
  console.log('entity: ' + text);
  var APP_NAME  = 'HARADATM3'
  var API_KEY   = '583055644d503937794e446834707247646d586947534948486a6d2e6c514e6b495242636746615a2e732f';
  var ENDPOINT = 'https://api.apigw.smt.docomo.ne.jp/gooLanguageAnalysis/v1/entity?APIKEY=' + API_KEY;
  var request_data = {
    sentence: text
  };
  var options = {
    url: ENDPOINT,
    body: JSON.stringify(request_data),
    headers: {
      'Content-Type': 'application/json',
    }
  }
  request.post(options, function(err, response, body) {
    if (! err) {
      var parse_body = JSON.parse(body);
      var ne_list = parse_body.ne_list;
      callback(ne_list);
    }
    else {
      console.log('error:' + err.message);
      res.status(500);
    }
  });
};

// 形態素解析
var morph = function(text, callback) {
  console.log('morph: ' + text);
  var APP_NAME  = 'HARADATM3'
  var API_KEY   = '583055644d503937794e446834707247646d586947534948486a6d2e6c514e6b495242636746615a2e732f';
  var ENDPOINT = 'https://api.apigw.smt.docomo.ne.jp/gooLanguageAnalysis/v1/morph?APIKEY=' + API_KEY;
  var request_data = {
    sentence: text,
    info_filter: 'form|pos|read',
    pos_filter: '名詞|Katakana|Kana'
  };
  var options = {
    url: ENDPOINT,
    body: JSON.stringify(request_data),
    headers: {
      'Content-Type': 'application/json',
    }
  }
  request.post(options, function(err, response, body) {
    if (! err) {
      var parse_body = JSON.parse(body);
      var word_list = parse_body.word_list;
      callback(word_list);
    }
    else {
      console.log('error:' + err.message);
      res.status(500);
    }
  });
};

// Web 検索
var web = function(text, callback) {
  console.log('web: ' + text);
  var APP_NAME  = 'haradatm-001'
  var API_KEY   = 'JhBd0WPRadQFRUf8xQi7bxwfUCXdvhQEVBrTcqln1lw';
  var ENDPOINT  = 'https://api.datamarket.azure.com/Bing/SearchWeb/Web?Query=' + encodeURIComponent("'" + text + "'") + '&$format=json';
  var options = {
    url: ENDPOINT,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(':'+API_KEY)).toString('base64')
    }
  };
  request.get(options, function(err, response, body) {
    if (! err) {
      var parse_body = JSON.parse(body);
      var results = parse_body.d.results;
      callback(results);
    }
    else {
      console.log('error:' + err.message);
      res.status(500);
    }
  });
};

// Get list of searchs
exports.index = function(req, res) {
  // res.json([]);

  var text = '鈴木さんがきょうの9時30分に横浜に行きます。';
  if (req.body.text !== undefined) {
    text = req.body.text;
  };

  // テスト
  var spawn = require('child_process').spawn,
    ps    = spawn('ps', ['ax']),
    grep  = spawn('grep', ['ssh']);

  ps.stdout.on('data', function (data) {
    grep.stdin.write(data);
  });
  ps.stderr.on('data', function (data) {
    console.log('ps stderr: ' + data);
  });
  ps.on('close', function (code) {
    if (code !== 0) {
      console.log('ps process exited with code ' + code);
    }
    grep.stdin.end();
  });

  grep.stdout.on('data', function (data) {
    console.log('' + data);
  });
  grep.stderr.on('data', function (data) {
    console.log('grep stderr: ' + data);
  });
  grep.on('close', function (code) {
    if (code !== 0) {
      console.log('grep process exited with code ' + code);
    }
  });

  // 音声検索
  entity(text, function(ne_list) {
    // 固有表現抽出
    if (ne_list.length > 0) {
      var query = '';
      _.each(ne_list, function(value, i, array) {
        query += value[0];
        query += ' ';
      });
      // Web 検索
      web(query, function(results) {
        res.status(200).json({
          query: query,
          results: results
        });
      });
    }
    else {
      res.status(200).json({
        text: query,
        results: []
      });
    }
  });

};
