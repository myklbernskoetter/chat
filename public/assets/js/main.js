"use strict";

(function(){

  var socket = io();
  var audio = document.getElementById("switchAudio");

  //Putting in some indicators that the chat is either active or inactive.
  $(".disconnect").on('click tap touch', function () {
    var user = $('#name').val();
    switchAudio.play();
    socket.emit('removeUsers', user);
    socket.close();
    $(this).css('display', 'none');
    $('.connect').css('display', 'inline');
    $('.light').toggleClass("off");
    $('#output').css('outline', '2px solid red');
    $('.userCount').css('visibility', 'hidden');
    $('.userList').empty();
  });

  $(".connect").on('click tap touch', function () {
    var user = $('#name').val();
    switchAudio.play();
    socket.connect();
    $(this).css('display', 'none');
    socket.emit('addUsers', user);
    $('.disconnect').css('display', 'inline');
    $('.light').toggleClass("off");
    $('#output').css('outline', 'none');
    $('.userCount').css('visibility', 'visible');
  });

// Keeping track of our total users Online
  socket.on('users', function(totalUsers) {
    $('.userCount').empty();
    $('.userCount').append(totalUsers);
  });

// We'll send the user's chosen name to the server
  $("#submit").on('click tap touch', function () {
    var user = $('#name').val();
    socket.emit('addUsers', user);
  });

// Once we send our name- the server will return the full array of online users
// back to us for us to output.
  socket.on('list', function(userList) {
    $('.userList').empty();
    for (var i = 0; i< userList.length; i++) {
      $('.userList').append('<div>' + userList[i] + '</div>');
    }
  });


  // Listening for an enter key press before running the submit message function
  $(document).keypress(function (e) {
    if( e.which === 13 ) {
      e.preventDefault();
      submitMessage();
    }
  });

  // Output 1 of 2 ways.  If connnected- run the submitMessage function which then emits through the socketio server.  Otherwise it just posts to the local user's window.
  function submitMessage() {
    var name = $('#name').val(),
    message = $('#chat-input').html(),
    smile =':)',
    frown = ':(',
    parsedMessage = message.replace(smile, '<img class="appendedEmoji" src="./assets/Images/smile.png"/>').replace(frown, '<img class="appendedEmoji" src="./assets/Images/frown.png"/>'),
    msg = '',
    color = $('#color').val(),
    time = timeStamp();
    if (name && message) {
      if (socket.connected) {
        msg = '<div class="speech"><p class="output" style="border: 2px solid ' + color + '" > <span class=" ' + name +'" >[' + time + '] ' +
        name + ':</span> ' + parsedMessage + '</p></div>';

        socket.emit('chat message', msg);
      } else {
        msg = '<div class="speech"><p class="output not-sent"> <span class="not-sent" style="color: ' + color + '">[' + time + '] ' +
        name + ':</span> ' + parsedMessage + '</p></div>';
        output(msg);
      }
    }
  }

  socket.on('chat message', function (msg) {
    output(msg);
  });

  function output(msg) {
    var $outputContainer = $('#output'),
    height = '';
    $outputContainer.append(msg);
    height = $outputContainer[0].scrollHeight;
    $outputContainer.scrollTop(height);
    $('#chat-input').empty();
  }

  function timeStamp() {
    var date = new Date(),
    seconds = date.getSeconds(),
    minutes = date.getMinutes(),
    hour = date.getHours(),
    time = hour + ':' + minutes + ':' + seconds;
    return time;
  }

})()
