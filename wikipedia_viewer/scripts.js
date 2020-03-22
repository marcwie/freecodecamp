var endpoint = "https://en.wikipedia.org/w/api.php?";
var url = "https://en.wikipedia.org/wiki/"
var randomPage = "https://en.wikipedia.org/wiki/Special:Random"

$(document).ready(function() { 
  
  $("#textinput").on("click", function() {
     $("#textinput").val("");
  });
  
  $("#random").on("click", function() { 
    window.open(randomPage, "_blank")
  });
  
  sendQuery = function() {
    searchFor = $("#textinput").val();
    
    apiCall = endpoint + "action=query&list=search&srsearch=";
    apiCall += searchFor+"&format=json&srlimit=20";
    
    $.getJSON(apiCall).done( function(json) {
      html = ""
      json.query.search.forEach(function(val){
        html += "<div class='row'><div class='col-md-8 col-md-offset-2'>";
        html += "<a href='"+url+val.title+"' target='_blank'>";
        html += "<div class='well'>"
        html += "<h4>"+val.title+"</h4>"+val.snippet+"...";
        html += "</div></a></div></div>";
      });
      if (html === "") {
        html += "<div class='row'><div class='col-md-8 col-md-offset-2'>";
        html += "<div class='well'>"
        html += "<h4>No results found for: "+searchFor+"</h4>"
        html += "</div></div>";
      }
      $("#results").html(html)
    }); 
  };
  
  $("#submit").on("click", function() {sendQuery()});
  
  $(document).keypress(function(e) {
    if(e.which == 13) { sendQuery(); }
  });
});
