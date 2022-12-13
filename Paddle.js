export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
    // getting the value of position from css var
  }
  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  update(delta, ballHeight, Speed) {
    this.position += Speed * delta * (ballHeight - this.position);
    console.log(Speed);

    //SPEED is needed to avoid impossible winning situation
    //(ballHeight-this.position)  if +ve move upawards or else vice versa
  }
  rect() {
    return this.paddleElem.getBoundingClientRect();
  }
  reset() {
    this.position = 50;
  }
}
