export const Friction = {
  gold: 2.5,
  silver: 1.5,
  glass: 0.4,
  oil: 0.05
};

export function inertia(x0, v0, frictionCoefficient, callback) {
  let prevTime = undefined;
  let x = x0;
  let v = v0;

  function tick(time) {
    if (!prevTime) {
      prevTime = time;
      requestAnimationFrame(tick);
      return;
    }
    const dt = time - prevTime;
    prevTime = time;

    v = modSubtract(v, frictionCoefficient * dt);
    const deltaX = v * dt;
    if (deltaX < 0.01) {
      return;
    }

    x += deltaX;
    callback({ x });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function modSubtract(x, y) {
  const sgn = x < 0 ? -1 : 1;
  x = Math.abs(x);
  y = Math.abs(y);
  if (y >= x) {
    return 0;
  }
  x -= y;
  return x * sgn;
}
