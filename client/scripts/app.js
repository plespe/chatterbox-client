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

  friends: [],

  init: function() {
    $(document).ready(function(){
      $("#send-message").on("click", function(event){
        var message = {};
        message.text = $("#user-input").text();
        message.username = window.location.search.slice(10);
        message.roomname = "main";
        app.send(message);
        $("user-input").text("Write something here");
        console.log("button works");
      });

      // $("")








    });
    // document ready loop to make sure DOM loaded
    // fetch messages from the server
    // if there's no room selected
      // fetch all messages and display
    // else
      // fetch all messages and only display for current room

    // add event listeners for button clicks
      // send message
        // post to server
        // fetch from server
      // create room
      // username
  },
  // message should adhere to above format
  send: function(message) {
    console.log("inside send");
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      // //clear the text window?
      success: function() {
        console.log("success");
      },
      error: function() {
        console.log("failure");
      }
    });
  },

  fetch: function() {
    //escape malicious HTML here
    $.ajax({
      url: app.server,
      type: 'GET',
      dataFilter: function(rawData){
        var sanitizedData = sanitizer.sanitizeHTML(rawData);
        return sanitizedData;
      },
      dataType: 'jsonp',
      success: function(data) {
        debugger;
        var messages = JSON.parse(data);
        for (var key in messages){
          app.addMessage(messages[key]);
        }
      },
      error: function() {
        console.log("failure");
      }
    });
  },

  // message should adhere to above format
  addMessage: function(message) {
    //if the message user is in our list of friends
    //add extra class "friend"
    //with special CSS styling
    var messageTemplate = '<div class="message"><span><a href="ADD DESTINATION HERE" class="username">' + message.username + '</a> to <a href="ADD DESTINATION HERE" class="roomname">' + message.roomname + '</a></span><p>' + message.text + '</p></div>';
    $('#chats').prepend(messageTemplate);
  },

  addFriend: function(target) {
    //keep an array of friends
    app.friends.push(target.text());
    //during addMessage:
      //if the message user is in our list of friends
      //add extra class "friend"
      //with special CSS styling
    //add friend to myspace
    $('#myspace').append(target.text());
    //refresh page
    app.clearMessages();
    app.fetch();
  },

  clearMessages: function() {
    $("#chats").empty();
  },

  addRoom: function(name) {
    var roomTemplate = '<span><a href="ADD DESITINATION HERE" class="roomname">' + name + '</a></span>';
    $('#roomSelect').prepend(roomTemplate);
  },

  handleSubmit: function() {

  }

};

app.init();
