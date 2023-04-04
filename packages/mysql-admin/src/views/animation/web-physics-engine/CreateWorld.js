// createWorld
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

let colorSet = [
  "#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff",
  "#a00", "#0a0", "#00a", "#aa0", "#a0a", "#0aa",
  "#500", "#050", "#005", "#550", "#505", "#055"
]
function ramdomColor() {
  let c = Math.floor(Math.random() * 18);
  return colorSet[c];
}

function ramdomCircle() {
  let c = new Circle(
    context,
    Math.random() * 500 + 50,
    Math.random() * 500 + 50,
    // Math.random() * 400 - 200,
    // Math.random() * 400 - 200,
    0,
    0,
    ramdomColor()
  );
  return c;
}
var circleSet = [
  // new Circle(context, 250, 300, 0, 0, 'FF0'),
  // new Circle(context, 250, 310, 0, 0, '0FF'),
  // new Circle(context, 250, 320, 0, 0),
  // new Circle(context, 250, 330, 0, 0),
  // new Circle(context, 250, 340, 0, 0),
  // new Circle(context, 250, 320, 0, 0),
  // new Circle(context, 260, 320, 0, 0),
  // new Circle(context, 270, 320, 0, 0),
  // new Circle(context, 280, 320, 0, 0),
  // new Circle(context, 290, 320, 0, 0),
]
function createRamdomCircles(long) {
  for (let i = 0; i < long; i++) {
    let c = ramdomCircle();
    if (circleSet[0] === undefined) {
      circleSet.push(c);
    }
    while (circlesColliding(c, circleSet[circleSet.length - 1])) {
      c = ramdomCircle();
    }
    circleSet.push(c);
  }
}
createRamdomCircles(12);

function resetIsColliding(circleSet) {
  for (let i = 0; i < circleSet.length; i++) {
    circleSet[i].isColliding = false;
  }
}