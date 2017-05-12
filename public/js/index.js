var $ = jQuery;
var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.html(message.from + ": " + message.text);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {

  });
});
