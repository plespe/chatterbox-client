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

  currentRoom: "All Rooms",

  init: function() {
    $(document).ready(function(){
      $("#send-message").on("click", function(event){
        var message = {};
        message.text = $("#text-input").val();
        message.username = window.location.search.slice(10);
        message.roomname = $('#room-selector').val();
        app.clearMessages();
        app.send(message);
        app.fetch();
        $("#text-input").val("");

      });
      // $("")

      $("body").on("click", ".username", function(event){

        event.preventDefault();

        var element = $(this);
        console.log(element.text());
        app.friends.push(element.text());
        app.clearMessages();
        app.fetch();
      });

      $("body").on("change", "#room-selector", function(event){
        // $("option:selected").prop("selected", false);
        var selection = $(this).val();
        if(selection === "create") {
          var newRoom = _.escape(prompt("Pick a room name"));
          app.currentRoom = newRoom;
          var newOption = $("<option value ='" + newRoom + "'>" + newRoom + "</option>");
          newOption.prop("selected", true);
          newOption.prependTo($(this));
        } else {
          app.currentRoom = selection;
          $(this).prop("selected", true);
        }
        app.clearMessages();
        app.fetch();
      });

      app.fetch();

    });

  },

  send: function(message) {
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
    $.ajax({
      url: app.server,
      type: 'GET',
      success: function(data, type) {
        console.log("yes?");
        _.each(data.results, function(message){
          app.addMessage(message);
        });
        console.log(data);
      },
      error: function(data, status) {
        console.log(data);
        console.log(status);
      }
    });
  },

  // message should adhere to above format
  addMessage: function(message) {

    var cleanText = _.escape(message.text);
    var cleanName = _.escape(message.username);
    var cleanRoom = _.escape(message.roomname);
    var friendClass = "";

    if (app.friends.indexOf(cleanName) > -1 ){
      friendClass = " friend";
    }

    console.log(app.currentRoom);

    if (app.currentRoom === "All Rooms"){
      var messageTemplate = '<div class="message' + friendClass + '"><span><a class="username" href="#">' + cleanName + '</a> to <a class="roomname">' + cleanRoom + '</a></span><p>' + cleanText + '</p></div>';
      $(messageTemplate).insertAfter("#chats h2");
    } else if (cleanRoom === app.currentRoom){
      var messageTemplate = '<div class="message' + friendClass + '"><span><a class="username" href="#">' + cleanName + '</a> to <a class="roomname">' + cleanRoom + '</a></span><p>' + cleanText + '</p></div>';
      $(messageTemplate).insertAfter("#chats h2");
    } else {
      return;
    }

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
    $("#chats").append("<h2>Messages</h2>");
  },

  addRoom: function(name) {
    var roomTemplate = '<span><a href="ADD DESITINATION HERE" class="roomname">' + name + '</a></span>';
    $('#roomSelect').prepend(roomTemplate);
  },

  handleSubmit: function() {

  }

};

app.init();
