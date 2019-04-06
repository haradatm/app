/**
 * Main application file
 */

'use strict';

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seedDatabaseIfNeeded = require('./config/seed');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ng2-chat';

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../')));
  app.set('appPath', path.join(__dirname, '../'));
}
else {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.set('appPath', path.join(__dirname, '../dist'));
}

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Setting up the socket.
 */
const socketio = require('socket.io')(server);
require('./config/socketio').default(socketio);

// Set our api routes
require('./routes').default(app);

// Populate databases with sample data
if (true) {
  seedDatabaseIfNeeded();
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

// Expose app
exports = module.exports = app;
