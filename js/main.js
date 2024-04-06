import '../style.css'
import { getMask, startLoop } from './mask';
import { generateImage } from './imageGen';


startLoop();

let image = null;
const canvas = document.getElementById("composition");

const testImage = document.getElementById("testImage");

const fetchLoop = async () => {
  const prevImage = image;
  const mask = getMask();

  const ctx = canvas.getContext("2d");
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-over';
  if (prevImage != null) {
    ctx.drawImage(prevImage, 0, 0);
  } else {
    ctx.drawImage(testImage, 0, 0);
  }

  ctx.globalCompositeOperation = 'destination-atop';
  ctx.drawImage(mask, 0, 0);


  const composite = canvas.toDataURL()//.split(';base64,')[1];;

  //console.log(composite);
  /*await fetch("http://locahost:8888/image", {
    method: "post",
    body: composite,
  });*/

  try {
    image = await generateImage(composite);
  } catch (e) {
    console.error(e);
    image = testImage;
  }

  setTimeout(fetchLoop, 500);
}

fetchLoop();


