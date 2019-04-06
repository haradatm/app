/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// var Utt = require('./utt.model');
//
// exports.register = function(socket) {
//   Utt.schema.post('save', function (doc) {
//     onSave(socket, doc);
//   });
//   Utt.schema.post('remove', function (doc) {
//     onRemove(socket, doc);
//   });
// }
//
// function onSave(socket, doc, cb) {
//   socket.emit('utt:save', doc);
// }
//
// function onRemove(socket, doc, cb) {
//   socket.emit('utt:remove', doc);
// }

exports.register = function(socket) {
  var event = ['broadcast:utt:message', 'new:utt:message'];
  socket.on(event[0], function(item, array) {
    console.log('[%s] GET MESSAGE', socket.address, event[0], item);
    socket.broadcast.emit(event[1], item, array);
  });
};
