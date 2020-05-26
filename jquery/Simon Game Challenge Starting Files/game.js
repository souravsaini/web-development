var gamePattern = [];
var userClickedPattern = [];
var started = true;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$("body").keypress(function() {
    if (started == true) {
      $("#level-title").text("Level " + level);
      nextSequence();

      started = false;
    }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber =  Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {
      console.log("wrong!");

      playSound("wrong");

      $("body").addClass("gameover");

      setTimeout(function() {
        $("body").removeClass("gameover");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}

$(".btn").click(function() {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
