export default class input {
  static mouseClick = null;
  static mouseMove = null;
  static mouseDown = null;
  static mouseUp = null;
  static mousePosition = { x: null, y: null, z: null };

  static keyUp = null;
  static keyDown = {};

  static init() {
    window.addEventListener("click", (e) => input._mouseClick(e));
    window.addEventListener("mousemove", (e) => input._mouseMove(e));
    window.addEventListener("mousedown", (e) => input._mouseDown(e));
    window.addEventListener("mouseup", (e) => input._mouseUp(e));

    window.addEventListener("keyup", (e) => input._keyUp(e));
    window.addEventListener("keydown", (e) => input._keyDown(e));
  }

  static _mouseMove(event) {
    input.mouseMove = event;
    input.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    input.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  static _mouseClick(event) {
    input.mouseClick = event;
  }

  static _mouseDown(event) {
    input.mouseDown = event;
  }

  static _mouseUp(event) {
    input.mouseUp = event;
    input.mouseDown = null;
  }

  static _keyDown(event) {
    input.keyDown[event.keyCode] = event;
  }

  static _keyUp(event) {
    input.keyUp = event;
    delete input.keyDown[event.keyCode];
  }

  static clear() {
    input.mouseMove = null;
    input.mouseClick = null;
    // input.mouseDown = null;
    input.mouseUp = null;
    input.mousePosition = { x: null, y: null, z: null };

    // input.keyDown = null;
    input.keyUp = null;
  }

  constructor() {
    throw new Error("cannot create object of input class");
  }
}
