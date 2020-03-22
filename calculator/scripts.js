var currentValue = "0";
var currentMeta = "";
var lastPress = ""

var compute = function() {
  var operator = currentMeta.slice(-1);
  var value = currentMeta.slice(0, currentMeta.length - 1);
  if (operator == "+"){ var result = Number(value) + Number(currentValue)}
  if (operator == "-"){ var result = Number(value) - Number(currentValue)}
  if (operator == "x"){ var result = Number(value) * Number(currentValue)}
  if (operator == "/"){ var result = Number(value) / Number(currentValue)}
  result = Math.round(result * 100000000000) / 100000000000;
  currentValue = String(result);
}

$(document).ready(function(){
  $("#results").html(currentValue);

  $(".button").on("click", function(){
 
    
    var button = $(this).html();
    var id = $(this).attr("id");
   
    if ( currentValue == "Infinity" || currentValue == "NaN") {
      currentValue = "0";
      currentMeta = "";
    }
    else if (id.includes("btn")) {
      if (currentValue === "0") { currentValue = ""; }
      if (currentValue === "-0") { currentValue = "-"; }
      if (lastPress == "operator") {currentValue = ""; }
      lastPress = "";
      if (currentValue.length < 20) {currentValue += button};
    }
    else if (id == "plusminus") {
      if (lastPress == "operator") {currentValue = "0"}
      if (currentValue.substring(0, 1) == "-")
        { currentValue = currentValue.substring(1); }
      else {
        currentValue = "-" + currentValue;
      }
      lastPress ="";
    }
    else if (id == "colon") {
      if (lastPress == "operator") {currentValue = "0"; lastPress=""; }
      if (! currentValue.includes(".") && currentValue.length < 20) {
        currentValue += "."};
    }
    else if (id.includes("operator")) {
      if (currentMeta != "") {
        compute();
      }
      currentMeta = currentValue + button;
      lastPress = "operator"
    }
    else if (id == "clear") {
      currentValue = "0";
      currentMeta = "";
      lasPress = "";
    }
    else if (id == "evaluate") {
      if (currentMeta != "") {
        compute();
        currentMeta = ""
        lastPress = "operator"
      }
    }
    
    $("#results").html(currentValue);
    $("#meta").html(currentMeta);

  })
})
