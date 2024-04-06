
const dot = document.getElementById("dot");
const maskCanvas = document.getElementById("maskCanvas");
const rect = maskCanvas.getBoundingClientRect();

let lookX = 0, lookY = 0;

/*
webgazer.setGazeListener((data, elapsedTime) => {
  console.log(data); //elapsed time is based on time since begin was called
  if (data == null) {
    return;
  }
  x = data.x;
  y = data.y;
  //dot.style.top = `${data.y}px`;
  //dot.style.left = `${data.x}px`;
  ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
}).begin();
*/

document.addEventListener("mousemove", event => {
  lookX = event.pageX;
  lookY = event.pageY;
})

//webgazer.begin();

const drawGradient = (ctx, x, y) => {
  const radius = 20;
  const gradient = ctx.createRadialGradient(x, y, 1, x, y, radius);
  gradient.addColorStop(0, '#fff2');
  gradient.addColorStop(0.3, '#fff1');
  gradient.addColorStop(1, '#fff0');

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

  if (circles.length > 100) {
    circles.shift();
  }
  circles.push({ x, y });

  let i = 0;
  for (let circle of circles) {
    console.log(i);
    i += 1;
    drawGradient(ctx, circle.x, circle.y);
  }
  drawGradient(ctx, x, y);

  setTimeout(loop, 50);
}

export const startLoop = loop();
export const getMask = () => {
  //todo
};

