const INITIAL_VELOCITY = 0.025;
const VELECITY_INCREASE = 0.00001;
export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x")); // getting the value of x from css var
  }
  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y")); // getting the value of y from css var
  }
  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }
  // bounce the ball  if hits thee y window
  rect() {
    return this.ballElem.getBoundingClientRect();
  }
  // reset start for for velocity nd direction of ball

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    // how the ball moves

    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    //console.log(this.direction);
    this.velocity = INITIAL_VELOCITY;
  }
  // reset end
  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELECITY_INCREASE; // increase speed as time passes ie so its difficult nd someone score
    const rect = this.rect();
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      //  bounce back if hits y wall
      this.direction.y *= -1;
    }
    if (paddleRects.some((r) => isCollision(r, rect))) {
      //  bounce back if hits paddle
      this.direction.x *= -1;
    }
  }
}
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
