const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class GameObject {
  constructor(context, x, y, vx, vy) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.isColliding = false;
  }
}

let allCircle;
function createCircle() {
  allCircle = [
    new Circle(context, 250, 50, 0, 50),
    new Circle(context, 250, 300, 0, -50),
    new Circle(context, 150, 0, 50, 50),
    new Circle(context, 250, 150, 50, 50),
    new Circle(context, 350, 75, -50, 50),
    new Circle(context, 300, 300, 50, -50)
  ]

}
let oldTimeStamp;
let secondsPassed;
function circleLoop(timeStamp) {
  if (oldTimeStamp === undefined) {
    oldTimeStamp = timeStamp;
  }
  let secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp - timeStamp;
  for (let i = 0; i < allCircle.length; i++) {
    allCircle[i].update(secondsPassed);
    allCircle[i].draw();
  }
  window.requestAnimationFrame(circleLoop);
}
// createCircle();
// window.requestAnimationFrame(circleLoop);




class Square extends GameObject {
  constructor(context, x, y, vx, vy) {
    super(context, x, y, vx, vy);

    // Set default width and height
    this.width = 50;
    this.height = 50;
  }

  draw() {
    // Draw a simple square
    this.context.fillStyle = this.isColliding ? '#ff8080' : '#0099b0';
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  update(secondsPassed) {
    // Move with set velocity
    if (this.x < 0 || this.x + this.width > canvas.width)
      this.vx *= -1;
    if (this.y < 0 || this.y + this.height > canvas.height)
      this.vy *= -1;

    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }
}


let gameObjects;
function createWorld() {
  gameObjects = [
    new Circle(context, 250, 50, 0, 50),
    new Circle(context, 250, 300, 0, -50),
    new Circle(context, 150, 0, 50, 50),
    new Circle(context, 250, 150, 50, 50),
    new Circle(context, 350, 75, -50, 50),
    new Circle(context, 300, 300, 50, -50)
  ];
}


function gameLoop(timeStamp) {
  if (oldTimeStamp === undefined) {
    oldTimeStamp = timeStamp;
  }
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // Loop over all game objects
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }

  function detectCollisions() {
    let obj1;
    let obj2;

    // Reset collision state of all objects
    for (let i = 0; i < gameObjects.length; i++) {
      gameObjects[i].isColliding = false;
    }

    // Start checking for collisions
    for (let i = 0; i < gameObjects.length; i++) {
      obj1 = gameObjects[i];
      for (let j = i + 1; j < gameObjects.length; j++) {
        obj2 = gameObjects[j];

        // Compare object1 with object2
        if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
          obj1.isColliding = true;
          obj2.isColliding = true;
        }
      }
    }
  }
  function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
      return false;
    }
    return true;
  }

  detectCollisions();
  clearCanvas();
  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Do the same to draw
  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  window.requestAnimationFrame(gameLoop);
}

// createWorld();
// window.requestAnimationFrame(gameLoop)