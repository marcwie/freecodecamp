var game = []

var humanSymbol = "X"
var computerSymbol = "O"
var playerList = [];

var reset = function() {
  game = [["", "", ""], 
          ["", "", ""], 
          ["", "", ""]]
  playerList = [humanSymbol, computerSymbol];
  $("#app").children().html("");
}

var score = function(game) {
  var tmpStats = [] 
  
  for (var i=0; i<3; i++) {
    tmpStats.push(game[i].join(""))
    var colStr = "";
    for (var j=0; j<3; j++) { colStr += game[j][i]; };
    tmpStats.push(colStr)
  };
  
  tmpStats.push(game[0][0] + game[1][1] + game[2][2]);
  tmpStats.push(game[0][2] + game[1][1] + game[2][0]);

  var finalScore = 0;
  tmpStats.forEach(function(val) {
    if (val == computerSymbol+computerSymbol+computerSymbol) {finalScore = 10}
    else if (val == humanSymbol+humanSymbol+humanSymbol) {finalScore = -10};
  });
  
  return finalScore;
}

var minimax = function(game, currentPlayer, depth) {
  var currentScore = score(game);
  if ( currentScore != 0 ) { return currentScore };
  
  var scores = [];
  var moves = [];
  var i, j;
  var nextPlayer;
  var indexOfOptimalScore;
  
  // Get possible moves
  for (i=0; i<3; i++) { for (j=0; j<3; j++) { 
    if (game[i][j] == "") { moves.push([i, j])}
  }}
  
  if ( moves.length == 0 ) {return currentScore}
  
  moves.forEach(function(move) {
    var possibleGame = game.map(function(arr) { return arr.slice(); });
    possibleGame[move[0]][move[1]] = currentPlayer;
    if (currentPlayer == "X") { nextPlayer = "O"; }
    else { nextPlayer = "X" };
    scores.push(minimax(possibleGame, nextPlayer, depth+1));
  })
  
  //if (depth == 0) {console.log(scores)};
  if (currentPlayer == computerSymbol) {
    indexOfOptimalScore = scores.indexOf(Math.max(...scores))
  }
  else {
    indexOfOptimalScore = scores.indexOf(Math.min(...scores));
  }
  
  if (depth > 0) {return scores[indexOfOptimalScore]}
  else { return moves[indexOfOptimalScore] };
  
  //return 0;
  /*
    tmpGame[emptyIds[c][0]][emptyIds[c][1]] = player;
    var tmpScore = score(tmpGame, player, opponent);
    if ( tmpScore == 10 ) { return emptyIds[c] }
    else tmpScore = computerTurn
  }
*/
  //var place = moves[Math.floor(Math.random()*moves.length)];
  //return place
  
}

var drawMove = function(row, col, currentPlayer) {
  $("#field"+row+col).html(currentPlayer);
  game[row][col] = currentPlayer;
}

var evaluate = function(game, player, opponent) {
  var isOver = false;
  var result = score(game, player, opponent);
  if ( result == 10 ) { 
    isOver = true;
    $(".results").html("Computer Wins!")
  }
  else if ( result == -10 ) {
    isOver = true;
    $(".results").html("Player Wins!")
  }  
  return isOver;
}

$(document).ready(function(){
  reset(); 
  
  $(".field").on("click", function(){
    var id = $(this).attr("id");
    var row = id.slice(-2, -1);
    var col = id.slice(-1);
    
    if (game[row][col] == "") { 
      var currentPlayer = playerList.shift();
      drawMove(row, col, currentPlayer);
      var isOver = evaluate(game, currentPlayer, playerList[0])
      playerList.push(currentPlayer)
      if ( isOver ) { reset() }
      else {
        //Computer
        var currentPlayer = playerList.shift();
        var move = minimax(game, currentPlayer, 0);
        console.log(move)
        drawMove(move[0], move[1], currentPlayer);
        var isOver = evaluate(game, currentPlayer, playerList[0])
        
        playerList.push(currentPlayer)
        if ( isOver ) reset();
      }
    }
  })  
})
