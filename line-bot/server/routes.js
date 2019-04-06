/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/rests', require('./api/rest'));
  app.use('/api/bots', require('./api/bot'));
  app.use('/api/things',  require('./api/thing'));
  app.use('/api/trans',   require('./api/trans'));
  app.use('/api/dialogs', require('./api/dialog'));
  app.use('/api/utts',    require('./api/utt'));
  app.use('/api/searchs', require('./api/search'));
  app.use('/api/line-bots', require('./api/line-bot'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
