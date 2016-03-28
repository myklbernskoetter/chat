"use strict";

(function(){
  //  Currently, clicking an emoji in the emoji container will  add emojis to the input line as they're writing their messages
  $(".emoji").on('click tap touch', function (e) {
    var emoji = $(this).attr('src');
    $('#chat-input').append('<img class="appendedEmoji" src="' + emoji + '"/>');
    $('.emojiContainer').toggleClass('emojiActive');
    $('#chat-input').focus();
  });
//
  $(".emojiToggle").on('click tap touch', function (e) {
    var color = $('#color').val();
    $('.emojiContainer').toggleClass('emojiActive');
    $('.emojiContainer').css('border', '3px solid color');
  });

})();
