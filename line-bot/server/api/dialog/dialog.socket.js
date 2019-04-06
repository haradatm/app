/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// var Dialog = require('./dialog.model');
//
// exports.register = function(socket) {
//   Dialog.schema.post('save', function (doc) {
//     onSave(socket, doc);
//   });
//   Dialog.schema.post('remove', function (doc) {
//     onRemove(socket, doc);
//   });
// }
//
// function onSave(socket, doc, cb) {
//   socket.emit('dialog:save', doc);
// }
//
// function onRemove(socket, doc, cb) {
//   socket.emit('dialog:remove', doc);
// }

exports.register = function(socket) {
  var event = ['broadcast:dialog:message', 'new:dialog:message'];
  socket.on(event[0], function(item, array) {
    console.log('[%s] GET MESSAGE', socket.address, event[0], item);
    socket.broadcast.emit(event[1], item, array);
  });
};
