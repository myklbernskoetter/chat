// "use strict";
//
// (function(){
//   // We Only need to run the function if we're focused
//   // on the chat-input and push enter to submit it.
//   if( $("#chat-input").on(':focus')) {
//     $(document).keypress(function(e) {
//       if( e.which == 13 ) {
//         e.preventDefault();
//         submitMessage();
//       }
//     });
//   }
//
//   //  Currently, clicking an emoji in the emoji container will  add emojis to the input line as their writing their messages
//   $(".emoji").on('click tap touch', function(e) {
//     var name = $('#name').val(),
//     lcName = name.toLowerCase(name),
//     time = timeStamp(),
//     emoji = $(this).attr('src');
//     if( name != '') {
//       $('#chat-input').append('<img class="appendedEmoji" src="' + emoji + '"/>');
//       setColor();
//     }
//   });
//
//
//   function submitMessage() {
//   // Input and Output
//     var name = $('#name').val(),
//     lcName = name.toLowerCase(name),
//     message = $('#chat-input').html(),
//     smile =':)',
//     frown = ':(',
//     parsedMessage = message.replace(smile, '<img class="appendedEmoji" src="./Images/smile.png"/>').replace(frown, '<img class="appendedEmoji" src="./Images/frown.png"/>'),
//     output = '',
//     $outputContainer = $('#output'),
//     height = '',
//     time = timeStamp();
//
//     if( name != '' && message != '' ) {
//       output = '<p class="output"> <span class="name ' + lcName +'">[' + time + '] ' +
//       name + ':</span> ' + parsedMessage + '</p>';
//
//       // We need to keep the chat area scrolled to the bottom
//       $outputContainer.append(output);
//       height = $outputContainer[0].scrollHeight;
//       $outputContainer.scrollTop(height);
//
//       setColor();
//
//     // 'Zero' out the chat input element.
//       $('#chat-input').empty();
//     }
//   }
//
//
//   function timeStamp() {
//     var date = new Date(),
//     seconds = date.getSeconds(),
//     minutes = date.getMinutes(),
//     hour = date.getHours(),
//     time = hour + ':' + minutes + ':' + seconds;
//
//     return time;
//   }
//
//   function setColor() {
//     // Set some color overrides for certain users
//     $('.name').css("color", "blue");
//     $('.mykl').css("color", "orange");
//   }
//
//   //Clear button to erase current chat
//   //  $('.clear').on('click tap touch', function (e) {
//   //    $('.output').remove();
//   //  });
//
//   }())
