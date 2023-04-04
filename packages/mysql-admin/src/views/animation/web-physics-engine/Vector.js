function oCollision(obj1, obj2) {
  let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };

  let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
  let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
  let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
  let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
  // if (speed < 0) {
  //   break;
  // }

  if (obj1.isColliding) {
    obj1.vx -= (speed * vCollisionNorm.x);
    obj1.vy -= (speed * vCollisionNorm.y);
  }
  if (obj2.isColliding) {
    obj2.vx += (speed * vCollisionNorm.x);
    obj2.vy += (speed * vCollisionNorm.y);
  }

  // let impulse = 2 * speed / (obj1.mass + obj2.mass);
  // obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
  // obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
  // obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
  // obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
}