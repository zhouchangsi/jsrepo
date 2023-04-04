// GameObject
class GameObject {
  constructor(context, x, y, vx, vy, color) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;

    this.mass = 1;
    this.isColliding = false;
  }
}

// Circle
class Circle extends GameObject {
  constructor(context, x, y, vx, vy, color) {
    super(context, x, y, vx, vy, color);
    this.radius = 20;
  }
  draw() {
    // this.context.fillStyle = this.isColliding ? '#ff8080' : this.color;
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
  }
  update(secondsPassed) {
    this.vy += 3;
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }
}
function circlesColliding(cA, cB) {
  let d = Math.sqrt(
    (cA.x - cB.x) ** 2 + (cA.y - cB.y) ** 2
  );
  let sd = cA.radius + cB.radius;
  if (d < sd)
    return true;
  return false;
}

function isCollidingBorder(c) {
  if (c.x - c.radius <= 0) {
    c.x = c.radius + 1;
    c.vx *= -1;
    c.vx *= 0.9;
  }
  if (c.x + c.radius >= canvas.width) {
    c.x = canvas.width - c.radius - 1;
    c.vx *= -1;
    c.vx *= 0.9;
  }
  if (c.y - c.radius <= 0) {
    c.y = c.radius + 1;
    c.vy *= -1;
    c.vy *= 0.9;
  }
  if (c.y + c.radius >= canvas.height) {
    c.y = canvas.height - c.radius - 1;
    c.vy *= -1;
    c.vy *= 0.9;
  }
}

// anime function
function drawLine(x, y, nx, ny) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(nx, ny);
  context.stroke();
}