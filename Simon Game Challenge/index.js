
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;
var i=0;

//key-bord press
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//click check
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern[userClickedPattern.length-1])
});
//check answer

function checkAnswer(currentLevel){
   if(currentLevel===gamePattern[i++]){
     console.log("Right");
   if(i===gamePattern.length){
   setTimeout(function () {
     userClickedPattern=[];
     i=0;
     nextSequence();
   }, 1000);
 }
}
   else{
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function () {
     $("body").removeClass("game-over");
   }, 200);
   $("h1").text("Game Over, Press Any Key To Restart");
   startOver();
   }
}
function nextSequence() {
   level++;
   $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//starting Over
function startOver(){
  level=0;
  gamePattern=[];
  i=0;
  started=false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
