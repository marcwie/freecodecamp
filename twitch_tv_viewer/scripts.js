var endpoint = "https://wind-bow.gomix.me/twitch-api/";
var streams = ["ESL_SC2", 
               "OgamingSC2", 
               "cretetion", 
               "freecodecamp", 
               "storbeck", 
               "habathcx", 
               "RobotCaleb", 
               "noobs2ninjas", 
               "brunofin"
              ];

//Create objects for each stream
function streamInfos(name) {
  this.name = name;
  this.status = "offline";
  this.logo = "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png";
  this.displayName = name;
  this.url = "https://www.twitch.tv/";
  this.viewer = 0;
  this.game = "";
}
for (var i=0; i<streams.length; i++){
  streams[i] = new streamInfos(streams[i]);
}

function updateStatus() {
  streams.forEach( function(channel) {
    $.getJSON(endpoint+"streams/"+channel.name+"?callback=?", function(json) {
      if (json.stream === null & channel.status != "deleted"){ 
        channel.status = "offline" ; 
        channel.viewer = 0; 
        channel.game = "";
      }
      else if (channel.status != "deleted") { 
        channel.status = "online"; 
        channel.viewer =  json.stream.viewers;
        channel.game = json.stream.game;
        $("#viewer"+channel.name).html("Viewer: "+channel.viewer); 
        $("#game"+channel.name).html("Game: "+channel.game);
      }
      $("#status"+channel.name).html("Status: "+channel.status);
    });
  });
}

function channelInfo() {
  streams.forEach( function(channel) {
    $.getJSON(endpoint+"channels/"+channel.name+"?callback=?", function(json) {
      if (json.status == 404) {
        channel.displayName = channel.name+" (deleted)";
        channel.status = "deleted";
      }
      else {
        if (json.logo !== null) { 
          channel.logo = json.logo; 
          $("#img"+channel.name).attr("src", json.logo);
        };
        channel.displayName = json.display_name;
        $("#name"+channel.name).html(channel.displayName)
        channel.url = json.url;
      };
    });
  });
};

function buildChannelList(which) {
  html = ""
  streams.forEach( function(channel) {
    if (which == "all" || which === channel.status) {
      html += "<div class='row'>"
      html += "<div class='col-md-4 col-md-offset-4 '>"
      html += "<a href='"+channel.url+"' target='_blank'>"
      html += "<div class='well box'>"
      html += "<img id='img"+channel.name+"' class='img img-circle' src='"+channel.logo+"' alt='Logo of "+channel.name+"'>"
      html += "<h4 class='B' id='name"+channel.name+"'>"+channel.displayName+"</h4>"
      html += "<div class='C'>"
      html += "<div class='innerbox'>"
      html += "<div class='game' id='game"+channel.name+"'>"
      if (channel.status == "online") {html += "Game:   "+channel.game};
      html += "</div>";
      html += "<div class='viewer' id='viewer"+channel.name+"'>"
      if (channel.status == "online") {html += "Viewer:   "+channel.viewer};
      html += "</div>";
      html += "<div class='status' id='status"+channel.name+"'>Status: "+channel.status+"</div>"
      html += "</div>"
      html += "</div>"
      html += "</div></a></div></div>"
    };
  });
  $("#channels").html(html)
};

$(document).ready( function() {
  buildChannelList("all")
  channelInfo();
  updateStatus()
  
  $("#showall").on("click", function(){
    $('.btn-group .active').removeClass('active');
    $("#showall").addClass('active');
    buildChannelList("all")
  });
  
  $("#showonline").on("click", function(){
    $('.btn-group .active').removeClass('active');
    $("#showonline").addClass('active');
    buildChannelList("online")
  });  
  
  $("#showoffline").on("click", function(){
    $('.btn-group .active').removeClass('active');
    $("#showoffline").addClass('active');
    buildChannelList("offline")
  });
  
  setInterval(function() {updateStatus()}, 60 * 1000);
});

