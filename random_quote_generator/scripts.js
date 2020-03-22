var quoteApi = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
var tweetApi = "https://twitter.com/?status="

var author = "";
var quote = "";

$(document).ready(function() {

  //Start of with a new quote
  newQuote();

  function newQuote() {
    $.getJSON(quoteApi, function(json) {
      console.log(json);
      quote = json.quoteText;
      author = json.quoteAuthor;
      if (author === "") {
        author = "unknown author"
      }
      $("#quote").html(quote);
      $("#author").html("--- "+author);
    });
  };
  
  $("#tweet").on("click", function(){
    var length = quote.length;
    var cleanQuote = quote.replace(/\s+$/, "");
    cleanQuote = encodeURIComponent(cleanQuote);
    var currentTweet = tweetApi + cleanQuote;
    window.open(currentTweet, "_blank");
  });
  
  $("#input").on("click", function(){
    newQuote();
  });
});

