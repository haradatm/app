'use strict';

const emitter = require('events');
const UserEvents = new emitter.EventEmitter();

// Set max event listeners (0 == unlimited)
UserEvents.setMaxListeners(0);

// Model events
const events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(User) {
  for(var e in events) {
    let event = events[e];
    User.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    UserEvents.emit(`${event}:${doc._id}`, doc);
    UserEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = UserEvents;
