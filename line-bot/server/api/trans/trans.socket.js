/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// var Trans = require('./trans.model');
//
// exports.register = function(socket) {
//   Trans.schema.post('save', function (doc) {
//     onSave(socket, doc);
//   });
//   Trans.schema.post('remove', function (doc) {
//     onRemove(socket, doc);
//   });
// }
//
// function onSave(socket, doc, cb) {
//   socket.emit('trans:save', doc);
// }
//
// function onRemove(socket, doc, cb) {
//   socket.emit('trans:remove', doc);
// }

exports.register = function(socket) {
  var event = ['broadcast:trans:message', 'new:trans:message'];
  socket.on(event[0], function(item, array) {
    console.log('[%s] GET MESSAGE', socket.address, event[0], item);
    socket.broadcast.emit(event[1], item, array);
  });
};
