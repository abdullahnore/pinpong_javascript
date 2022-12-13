//update loop(where the game is going to run)
import Ball from "./ball.js";
import Paddle from "./Paddle.js";

//start game
let play = false;
let arr = [];
const textPlay = document.getElementById("textp");
localStorage.setItem("winner", arr);
let Speed = 0.004; // speed of computer paddle ,increase for diffulty

//player score
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

// for ball
const ball = new Ball(document.getElementById("ball"));

// paddle
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

let lastTime;
function update(time) {
  // will take in time variable since the start of the program
  if (lastTime != null && play == true) {
    const delta = time - lastTime;
    //ballupdate code

    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    // for computer paddle
    computerPaddle.update(delta, ball.y, Speed);
    // pass delta and y postion so paddle knows where the ball is
    if (isLose()) {
      handleLoose();
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

// to move the paddle through mouse
document.addEventListener("mousemove", (e) => {
  //this code will move the paddle wherever the mouse moves
  playerPaddle.position = (e.y / window.innerHeight) * 100; // converting  pixel to % as position in css is in %
});

//  if someone loose ie loose function
function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
// to update score
function handleLoose() {
  const rect = ball.rect();

  if (rect.right >= window.innerWidth) {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  } else {
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  }

  ball.reset();
  computerPaddle.reset();
}

//start game on enter function

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (arr.length == 0) {
      // if its the first game
      alert("Game started \n This is the first game!!");
      textPlay.innerHTML = "Press ESC to End Game";
      play = true;
    } else if (play == false) {
      arr = localStorage.getItem("winner", arr).split(",");

      alert(
        "Game started \n Previous score: " +
          arr[0] +
          "\n Previous winner: " +
          arr[1] +
          "\n Highest score: " +
          arr[2]
      );
      textPlay.innerHTML = "Press ESC to End Game";
      play = true;
    }
  }
});

//end game on escape function
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && play == true) {
    event.preventDefault();
    play = false;
    winner();
    ball.reset();
    computerPaddle.reset();
    resetScore();
    textPlay.innerHTML = "Press enter to play";
  }
});

// reset score
function resetScore() {
  playerScore.textContent = 0;
  computerScore.textContent = 0;
}

//save data of winner and score
function winner() {
  if (arr.length == 0) {
    var highscore = 0; // for first game
  } else {
    arr = localStorage.getItem("winner", arr).split(",");
    highscore = arr[2];
  }

  if (playerScore.textContent < computerScore.textContent) {
    if (computerScore.textContent > highscore) {
      highscore = computerScore.textContent;
    }
    arr = [computerScore.textContent, "computer", highscore];
    localStorage.setItem("winner", arr);
    alert("Game  end \n Winner computer");
  } else if (playerScore.textContent > computerScore.textContent) {
    if (playerScore.textContent > highscore) {
      highscore = playerScore.textContent;
    }
    arr = [playerScore.textContent, "player", highscore];
    alert("Game  end \n Winner player");

    localStorage.setItem("winner", arr);
  } else {
    arr = [playerScore.textContent, "draw", highscore];
    localStorage.setItem("winner", arr);
    alert("Game  end \n Its a Draw");
  }
}

//for testing purpose manually increment score on player
window.addEventListener("keydown", function (event) {
  if (event.key === "s" && play == true) {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  }
});

//for increasing difficulty
window.addEventListener("keydown", function (event) {
  if (event.key === "w" && play == true) {
    Speed += 0.001;
  }
});

//calls update loop for every frame
window.requestAnimationFrame(update);
