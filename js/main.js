import '../style.css'

const dot = document.getElementById("dot");
const maskCanvas = document.getElementById("dot");
const ctx = maskCanvas.getContext("2d");

let x, y;

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
}).begin();
*/

document.addEventListener("mousemove", event => {
  x = event.pageX;
  y = event.pageY;
})

webgazer.begin();

const loop = () => {
  dot.style.top = `${y}px`;
  dot.style.left = `${x}px`;

  const gradient = ctx.createRadialGradient(x, y, 10, x, y, 100);
  gradient.addColorStop(0, '#000f');
  gradient.addColorStop(1, '#0000');
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
