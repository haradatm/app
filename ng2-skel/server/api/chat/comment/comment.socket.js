/**
 * Broadcast updates to client when the model changes
 */

'use strict';

const CommentEvents = require('./comment.events');

// Model events to emit
const events = ['save', 'remove'];

exports.register = function(socket) {
  // Bind model events to socket events
  for(let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    const event = events[i];
    const listener = createListener(`comment:${event}`, socket);

    CommentEvents.default.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    CommentEvents.default.removeListener(event, listener);
  };
}
