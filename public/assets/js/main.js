"use strict";

(function(){

  var socket = io();
console.log(socket);
  //Putting in some indicators that the chat is either active or inactive.
  $(".disconnect").on('click tap touch', function() {
    socket.close();
    $(this).css('display', 'none');
    $('.connect').css('display', 'inline');
    $('.light').toggleClass("off");
    $('#output').css('outline', '3px solid red');
    console.log(socket);

  });

  $(".connect").on('click tap touch', function() {

    socket.connect();
    $(this).css('display', 'none');
    $('.disconnect').css('display', 'inline');
    $('.light').toggleClass("off");
    $('#output').css('outline', '3px solid black');
  });


  // We Only need to run the function if we're focused
  // on the chat-input and push enter to submit it.
  if( $("#chat-input").on(':focus')) {
    $(document).keypress(function(e) {
      if( e.which == 13 ) {
        e.preventDefault();
        submitMessage();
      }
    });
  }

  //  Currently, clicking an emoji in the emoji container will  add emojis to the input line as their writing their messages
  $(".emoji").on('click tap touch', function(e) {
    var name = $('#name').val(),
    lcName = name.toLowerCase(name),
    time = timeStamp(),
    emoji = $(this).attr('src');
    if( name != '') {
      $('#chat-input').append('<img class="appendedEmoji" src="' + emoji + '"/>');
      setColor();
    }
  });

    socket.on('chat message', function(msg){
      output(msg);
    });

  function submitMessage() {
  // Input and Output
    var name = $('#name').val(),
    lcName = name.toLowerCase(name),
    message = $('#chat-input').html(),
    smile =':)',
    frown = ':(',
    parsedMessage = message.replace(smile, '<img class="appendedEmoji" src="./Images/smile.png"/>').replace(frown, '<img class="appendedEmoji" src="./Images/frown.png"/>'),
    msg = '',
    time = timeStamp();

    if( name != '' && message != '' ) {


      if(socket.connected === true) {
        msg = '<p class="output"> <span class="name ' + lcName +'">[' + time + '] ' +
        name + ':</span> ' + parsedMessage + '</p>';

        socket.emit('chat message', msg);

      } else {
        msg = '<p class="output not-sent"> <span class="not-sent">[' + time + '] ' +
        name + ':</span> ' + parsedMessage + '</p>';

        output(msg);
      }
    }
  }

  function output(msg) {
    var $outputContainer = $('#output'),
    height = '';
    $outputContainer.append(msg);
    height = $outputContainer[0].scrollHeight;
    $outputContainer.scrollTop(height);
    setColor();
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

  function setColor() {
    // Set some color overrides for certain users
    $('.name').css("color", "blue");
    $('.mykl').css("color", "orange");
  }
}())
