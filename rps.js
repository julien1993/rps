// delcare the global variables needed

var playerMoves=[];
var playMove=null;
var z=0;
var setCompMove=null;
var playerScore=0;
var computerScore=0;

/* this function generates a random number between 1 and the maxNum value
it does this by generating a standard Math.random result, multiplying by maxNum
adding 1 and then removing all decimal place points with Math.floor */

function randomWholeNum(maxNum) {
  return (Math.floor(Math.random() * maxNum))+1;
}

/* this function converts an input called value to text of rock, paper or scissors
the first error trapping is found in the final 'else' statement - ie, if it's not
1, 2 or 3 then write error to the console */
function convertToText(value) {
    if (value==1) {
      return("rock");
    }
    else if (value==2) {
      return("paper");
    }
    else if (value==3) {
      return("scissors");
    }
    else {
      document.getElementById("game-feedback-container").innerHTML=document.getElementById("game-feedback-container").innerHTML+("error<br>");
    }
}

/* this is a very simplistic AI model for the game.  it assesses the moves that are known
to have been made by the player, and looks for the move taken by the player with the most
iterations of that move (ie, if the player has played rock 3 times, paper 2 times and
scissors 1 time, then it will assess that the player is likely to play Rock, and therefore
choose paper as the best possible option).

it does this by using rockCount, paperCount and scissorsCount, running through an array
of all moves taken by the player, and using <type>count++

it then compares the values, to return the best possible guess.

in the case of no highest number (ie, no plays made, or two or more of the counts returning
the same value) the computer AI will return a random value */

function assessPlayerMoves() {
setCompMove=null;
count=0;
rockCount=0;
scissorsCount=0;
paperCount=0;
while(count<playerMoves.length) {
  if(playerMoves[count]=="rock") {
    rockCount++;
  }
  else if(playerMoves[count]=="scissors") {
    scissorsCount++;
  }

  else if(playerMoves[count]=="paper") {
    paperCount++;
  }
  else {
    document.getElementById("game-feedback-container").innerHTML=("error<br>");
  }
  count++;
}

if (rockCount > scissorsCount && rockCount > paperCount) {

  setCompMove="paper";
}
else if (scissorsCount > rockCount && scissorsCount > paperCount) {
setCompMove="rock";
}

else if (paperCount > rockCount && paperCount > scissorsCount) {
setCompMove="scissors";
}

else {
setCompMove=null;
}
}


/* this function creates the computers' move.

it does this by first running the above AI function, which will set the global
variable of setCompMove to either rock, paper, scissors or null, then by saying

if setCompMove is null, generate a random number, else return the value already
set for setCompMove

*/

function getComputerMove() {
assessPlayerMoves();
if(!setCompMove) {
  rand=randomWholeNum(3);
  textres=convertToText(rand);
  return(textres);
}
else {
  return(setCompMove);
}

}


function setPlayerMove(selected) {
  playMove=selected;
  if (selected=='rock') {
    document.getElementById("rock").style.backgroundColor="green";
    document.getElementById("paper").style.backgroundColor="red";
    document.getElementById("scissors").style.backgroundColor="red";
  }
  else if (selected=='paper') {
    document.getElementById("rock").style.backgroundColor="red";
    document.getElementById("paper").style.backgroundColor="green";
    document.getElementById("scissors").style.backgroundColor="red";
  }
  else if (selected=='scissors') {
    document.getElementById("rock").style.backgroundColor="red";
    document.getElementById("paper").style.backgroundColor="red";
    document.getElementById("scissors").style.backgroundColor="green";
  }

}
/* this function gets the player move, it does this by seting valid to false,
then using a while loop on valid NOT true, it asks for an input.

it then converts the result to lower case.  it returns the result, and the final else
returns valid as false and loops back just as an error capture */

// function getPlayerMove() {
// var valid = false
// while(valid != true) {
//   var input=prompt('enter a choice: Rock, Paper or Scissors');
//   document.getElementById("game-feedback-container").innerHTML=(input);
//   if(!input) {
//     return;
//   }
//   lowerCaseResult=input.toLowerCase();
//
//
//   if (input=="rock") {
//     return lowerCaseResult;
//   }
//   else if (input=="paper") {
//     return lowerCaseResult;
//   }
//   else if (input=="scissors") {
//     return lowerCaseResult;
//   }
//
//   else {
//   valid = false;
//   }
// }
// }

//this function simply displays the score in the console log

function displayScore () {
document.getElementById("playerScore").innerHTML=playerScore;
document.getElementById("computerScore").innerHTML=computerScore;
}

/*this function runs a check on who has won.  it does this by recieving the player's move
and the computers' move, comparing them together against the possible options.

if a draw, don't add anything to either score, then console what was chosen, and console
log a it's a draw

if player win, add to playerScore and console log the choices along with player wins

if computer win, add to computerScore and console log the choices along with computer wins

finally, error trap by console log error

*/

function checkWinner(playerMove, computerMove) {
if (playerMove==computerMove) {
  document.getElementById("game-feedback-container").innerHTML=document.getElementById("game-feedback-container").innerHTML+("we both selected "+playerMove+"<br>");
  document.getElementById("game-feedback-container").innerHTML=document.getElementById("game-feedback-container").innerHTML+("it's a draw<br>");
}
else if ((playerMove=="rock" && computerMove=="scissors") || (playerMove=="paper" && computerMove=="rock") || (playerMove=="scissors" && computerMove=="paper")) {
  document.getElementById("game-feedback-container").innerHTML=document.getElementById("game-feedback-container").innerHTML+("I selected "+computerMove+" and You selected "+playerMove+"<br>");
  document.getElementById("game-feedback-container").innerHTML=document.getElementById("game-feedback-container").innerHTML+("you win!!!<br>");
  playerScore++;

}

else if ((playerMove=="scissors" && computerMove=="rock") || (playerMove=="paper" && computerMove=="scissors") || (playerMove=="rock" && computerMove=="paper")) {
  document.getElementById("game-feedback-container").innerHTML=document.getElementById("game-feedback-container").innerHTML+("I selected "+computerMove+" and You selected "+playerMove+"<br>")
  document.getElementById("game-feedback-container").innerHTML=document.getElementById("game-feedback-container").innerHTML+("I WIN!!!");
  computerScore++;
}
else {
  document.getElementById("game-feedback-container").innerHTML= ("error");
}
}

// this function pushes the player's last move to the end of the array playerMoves
function collectPlayerMoves(lastMove) {
    playerMoves.push(lastMove);
  }


/* this is the main playGame function, which loops until the confirm is false

it gets the player move, then the computer move, then checks the winner,
collects the player's move into the array, displays the score, then asks if you'd like to
play again

note: the AI does NOT recieve the input for the current player move, only the moves preceeding it*/

function playGame() {
    document.getElementById("game-feedback-container").innerHTML="";
    if(playMove==null) {
      document.getElementById("game-feedback-container").innerHTML ="<span style=\"color:red; font-size:4em;\">error</span><br>";
      return;
    }
    var compMove=getComputerMove();
    checkWinner(playMove, compMove);
    collectPlayerMoves(playMove);
    displayScore();
    playMove=null;
    document.getElementById("rock").style.backgroundColor="white";
    document.getElementById("paper").style.backgroundColor="white";
    document.getElementById("scissors").style.backgroundColor="white";
}

/* Code Revisions:

1) introduce pattern checking into the AI, for example if the player follows a pattern
that becomes predictable, guess that the next move will fit that pattern, and not worry
about the most common answer

2) insert all code into a html web-page, recieving and returning function results there
and not in the console

*/
