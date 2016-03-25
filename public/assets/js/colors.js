"use strict";

(function(){
  // The User gets to choose their own color and it shows up in several places- the header, the chat banner section, and their messages.
  $('#color').bind('input', function () {
    var color = $(this).val();
    $('header').css('background', color);
    $('#color').css('color', color);
  });
})()
