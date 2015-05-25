// YOUR CODE HERE:

// $.ajax({
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: '',
//   dataType: 'jsonp',
//   success: ,
//   error:
// });

// var message = {
//   'username': '',
//   'text': '',
//   'roomname':
// };
var app = {

  server: "https://api.parse.com/1/classes/chatterbox",

  init: function() {

  },
  // message should adhere to above format
  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      dataType: 'jsonp',
      //clear the text window?
      success: function() {
        console.log("success");
      },
      error: function() {
        console.log("failure");
      }
    });
  },

  fetch: function() {
    var test = $.ajax({
      url: app.server,
      type: 'GET',
      dataType: 'jsonp',
      success: function() {
        debugger;
        console.log(arguments);
      },
      error: function() {
        console.log("failure");
      }
    });
  },

  // message should adhere to above format
  addMessage: function(message) {

  },

  addFriend: function() {

  },

  clearMessages: function() {
    $("#chats").empty();
  },

  addRoom: function() {

  },

  handleSubmit: function() {

  }


};
