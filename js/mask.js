
const dot = document.getElementById("dot");
const maskCanvas = document.getElementById("maskCanvas");
const rect = maskCanvas.getBoundingClientRect();

let lookX = 0, lookY = 0;

//*
webgazer.setGazeListener((data, elapsedTime) => {
  if (data == null) {
    return;
  }
  lookX = data.x;
  lookY = data.y;
  //ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
}).begin();
// */

/*
document.addEventListener("mousemove", event => {
  lookX = event.pageX ?? 0;
  lookY = event.pageY ?? 0;
})

// */

webgazer.begin();

const drawGradient = (ctx, x, y) => {
  const radius = maskCanvas.height / 5;
  const gradient = ctx.createRadialGradient(x, y, 1, x, y, radius);
  gradient.addColorStop(0, '#ffffff30');
  gradient.addColorStop(0.3, '#ffffff20');
  gradient.addColorStop(1, '#ffffff00');

  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.fill();
}

let circles = [];

const loop = () => {
  dot.style.top = `${lookY}px`;
  dot.style.left = `${lookX}px`;

  const ctx = maskCanvas.getContext("2d");
  ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

  const x = (lookX - rect.left) * maskCanvas.width / rect.width;
  const y = (lookY - rect.top) * maskCanvas.height / rect.height;

  if (circles.length > 30) {
    circles.shift();
  }
  circles.push({ x, y });

  for (let circle of circles) {
    drawGradient(ctx, circle.x, circle.y);
  }
  drawGradient(ctx, x, y);

  setTimeout(loop, 10);
}

export const startLoop = loop;
export const getMask = () => {
  return maskCanvas;
};

