var express = require('express');
var http = require('http');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var totalUsers = 0;
var userNum = 0;
var userList = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  totalUsers ++
  io.emit('users', totalUsers);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    totalUsers --;
    io.emit('users', totalUsers);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
