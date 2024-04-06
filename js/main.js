import '../style.css'
import { getMask, startLoop } from './mask';
import { generateImage } from './imageGen';


startLoop();

let image = null;
const canvas = document.getElementById("composition");

const fetchLoop = async () => {
  const prevImage = image;
  const mask = getMask();

  const ctx = canvas.getContext("2d");
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(mask, 0, 0);

  ctx.globalCompositeOperation = 'destination-out';
  if (prevImage != null) {
    ctx.drawImage(prevImage, 0, 0);
  }

  const composite = canvas.toDataURL("image/png").split(';base64,')[1];;

  //console.log(composite);
  /*await fetch("http://locahost:8888/image", {
    method: "post",
    body: composite,
  });*/

  try {
    image = await generateImage(composite);
  } catch (e) {
    console.error(e);
  }

  setTimeout(fetchLoop, 3000);
}

fetchLoop();


