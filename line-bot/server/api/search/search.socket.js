/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// var Search = require('./search.model');
//
// exports.register = function(socket) {
//   Search.schema.post('save', function (doc) {
//     onSave(socket, doc);
//   });
//   Search.schema.post('remove', function (doc) {
//     onRemove(socket, doc);
//   });
// }
//
// function onSave(socket, doc, cb) {
//   socket.emit('search:save', doc);
// }
//
// function onRemove(socket, doc, cb) {
//   socket.emit('search:remove', doc);
// }

exports.register = function(socket) {
  var event = ['broadcast:search:message', 'new:search:message'];
  socket.on(event[0], function(item, array) {
    console.log('[%s] GET MESSAGE', socket.address, event[0], item);
    socket.broadcast.emit(event[1], item, array);
  });
};
