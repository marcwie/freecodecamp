var pomodoroLength = 25;
var remainingTime = pomodoroLength * 60;
var isRunning = false;
var isPomodoro = true;

var secondsToTime = function(time) {
  var seconds = time % 60;
  var minutes = (time - seconds) / 60
  if (seconds < 10) { var result = minutes + ":0" + seconds }
  else { var result = minutes + ":" + seconds }
  return result;
}

$(document).ready(function() {  
  $("#clock").html(secondsToTime(remainingTime));
  
  $("#start").on("click", function() {
    if ( ! isRunning ) {
      isRunning = true;
      isPomodoro = true;
      $("#stop").html("Stop");
    }
  })
  
  $("#stop").on("click", function() {
    if ( isRunning ) {
      isRunning = false;
      $(this).html("Reset");
    }
    else {
      $(this).html("Stop");
      isPomodoro = true;
      remainingTime = pomodoroLength * 60
      $("#clock").html(secondsToTime(remainingTime));
    }
  })

  $(".pomodorobutton").on("click", function() {
    if ($(this).attr("id").includes("plus")) {
      pomodoroLength += 1;
    }
    else if (pomodoroLength > 1) { 
      pomodoroLength -= 1; 
    }
    $("#pomodorotime").html(pomodoroLength);   
    if ( ! isRunning ) {
      remainingTime = pomodoroLength * 60;
      $("#clock").html(secondsToTime(remainingTime));
    }
  })
  
  $(".breakbutton").on("click", function() {
    if ($(this).attr("id").includes("plus")) {
      breakLength += 1;
    }
    else if (breakLength > 0) { 
      breakLength -= 1; 
    }
    $("#breaktime").html(breakLength);   
  })
                        
                        
  setInterval(function() {
    if (isRunning && remainingTime > 0) {
      remainingTime-=1;
      $("#clock").html(secondsToTime(remainingTime));
    }
    else if (isRunning && remainingTime == 0) {
      isRunning = false;
      remainingTime = pomodoroLength * 60;
      $("#clock").html(secondsToTime(remainingTime));
    };
    
  }, 1000);
})
