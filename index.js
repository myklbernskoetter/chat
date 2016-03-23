var express = require('express');
var http = require('http');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userCount = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  // console.log('a user connected');
  userCount++;
  console.log(userCount);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    // console.log('message: ' + msg);
  });

  socket.on('disconnect', function(){
    // console.log('user disconnected');
    userCount--;
    console.log(userCount)
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
