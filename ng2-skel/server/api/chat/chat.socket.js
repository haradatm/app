/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// import ThingEvents from './thing.events';
//
// // Model events to emit
// var events = ['save', 'remove'];
//
// export function register(socket) {
//   // Bind model events to socket events
//   for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
//     var event = events[i];
//     var listener = createListener(`thing:${event}`, socket);
//
//     ThingEvents.on(event, listener);
//     socket.on('disconnect', removeListener(event, listener));
//   }
// }
//
//
// function createListener(event, socket) {
//   return function(doc) {
//     socket.emit(event, doc);
//   };
// }
//
// function removeListener(event, listener) {
//   return function() {
//     ThingEvents.removeListener(event, listener);
//   };
// }

exports.register = function(socket) {

  const event = [
    'receive:chat:message',
    'new:chat:message'
  ];

  socket.on(event[0], (comment) => {
    console.log('SocketIO / [%s] GET MESSAGE %s', socket.address, event[0]);
    console.dir(comment);
    socket.broadcast.emit(event[1], comment);
  });

};
