/** @type {HTMLCanvasElement} */

// fix circle collision
function fixCircles(cA, cB) {
  if (circlesColliding(cA, cB)) {

    cA.isColliding = true;
    cB.isColliding = true;

    let vC = { x: cB.x - cA.x, y: cB.y - cA.y };
    let dC = Math.sqrt(vC.x ** 2 + vC.y ** 2);
    let vcf = { x: vC.x / dC, y: vC.y / dC };

    let vR = { x: cB.vx + cA.vx, y: cB.vy + cA.vy };

    function vectorLength(vector) {
      return Math.sqrt(vector.x ** 2 + vector.y ** 2);
    }

    function vCos(va, vb) {
      return (va.x * vb.x + va.y * vb.y) / vectorLength(va) * vectorLength(vb);
    }

    let vcl = vectorLength(vR) * vCos(vR, vC);

    vcf.x *= vcl;
    vcf.y *= vcl;

    cA.vx += vcf.x;
    cA.vy += vcf.y;

    function dc(cA, cB) {
      cA.x -= vcf.x * 0.02;
      cA.y -= vcf.y * 0.02;
    }

    while (circlesColliding(cA, cB)) {
      dc(cA, cB);
    }

  }
}
function drawWorld() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  resetIsColliding(circleSet);

  for (let i = 0; i < circleSet.length; i++) {
    let c1 = circleSet[i];
    for (let j = i + 1; j < circleSet.length; j++) {
      let c2 = circleSet[j];
      // fixCircles(cA, cB);
      if (circlesColliding(c1, c2)) {
        c1.isColliding = true;
        c2.isColliding = true;
        oCollision(c1, c2);
      }
    }
  }

  // colliding border
  for (let i = 0; i < circleSet.length; i++) {
    isCollidingBorder(circleSet[i]);
  }

  // draw
  for (let i = 0; i < circleSet.length; i++) {
    circleSet[i].update(20 / 1000)
  }
  for (let i = 0; i < circleSet.length; i++) {
    let c = circleSet[i];
    c.draw();
    drawLine(c.x, c.y, c.x + c.vx / 4, c.y + c.vy / 4);
  }
}




