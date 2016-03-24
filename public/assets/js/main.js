"use strict";

(function(){

  var socket = io();
  console.log(socket);
  var audio = document.getElementById("switchAudio");

  $('#name').focus();

  $("#submit").on('click tap touch', function () {
    var name = $('#name').val();
    if(name) {
      $('.name').animate({
        opacity: 0,
        height: "toggle",
        background: 'none'
      });
    } else {
      alert('Add your name!');
    }
  });

  $(".arrow").on('click tap touch', function () {
    $('.name').animate({
      opacity: 1,
      height: "toggle",
      background: 'black'
    });
  });

  //Putting in some indicators that the chat is either active or inactive.
  $(".disconnect").on('click tap touch', function () {
    switchAudio.play();
    socket.close();
    $(this).css('display', 'none');
    $('.connect').css('display', 'inline');
    $('.light').toggleClass("off");
    $('#output').css('outline', '2px solid red');
  });

  $(".connect").on('click tap touch', function () {
    switchAudio.play();
    socket.connect();
    $(this).css('display', 'none');
    $('.disconnect').css('display', 'inline');
    $('.light').toggleClass("off");
    $('#output').css('outline', 'none');
  });

  // The User gets to choose their own color and it shows up in several places- the header, the chat banner section, and their messages.
  $('#color').bind('input', function () {
    var color = $(this).val();
    $('header').css('background', color);
    $('#color').css('color', color);
  });

  // We Only need to run the function if we're focused
  // on the chat-input and push enter to submit it.
  $(document).keypress(function (e) {
    if( e.which === 13 ) {
      e.preventDefault();
      submitMessage();
    }
  });

  //  Currently, clicking an emoji in the emoji container will  add emojis to the input line as they're writing their messages
  $(".emoji").on('click tap touch', function (e) {
    var emoji = $(this).attr('src');
    $('#chat-input').append('<img class="appendedEmoji" src="' + emoji + '"/>');
    $('.emojiContainer').toggleClass('emojiActive');
    $('#chat-input').focus();
  });

  $(".emojiToggle").on('click tap touch', function (e) {
    var color = $('#color').val();
    $('.emojiContainer').toggleClass('emojiActive');
    $('.emojiContainer').css('border', '3px solid color');
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

}())
