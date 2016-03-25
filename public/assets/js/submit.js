"use strict";

(function(){
// User chooses their name and their branding color
  $('#name').focus();

  $("#submit").on('click tap touch', function () {
    var name = $('#name').val();
    if(name) {
      $('.name').animate({
        height: "toggle",
        background: 'none'
      });
    } else {
      alert('Add your name!');
    }
  });

  $(".arrow").on('click tap touch', function () {
    $('.name').animate({
      height: "toggle",
      background: 'black'
    });
  });
})()
