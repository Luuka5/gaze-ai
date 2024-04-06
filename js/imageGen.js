
const canvas = document.getElementById("aiImage");
const ctx = canvas.getContext("2d");

export async function generateImage(image) {
  const resp = await fetch(
    'http://localhost:8888/development/predict',
    {
      method: 'POST',
      headers: { Authorization: 'Api-Key EVlZTrUE.UcbCHD6uN6LtatFcFd74hD1j6DG7IqDc' },
      body: JSON.stringify({
        "workflow_values":
        {
          //"negative_prompt": "blurry, text, low quality",
          //"positive_prompt": "An igloo on a snowy day, 4k, hd",
          "image": image,
        },
      }),
    }
  );

  const data = await resp.json();
  const base64 = data.result[0].data;

  return await new Promise((res) => {
    const image = new Image();
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      res(canvas);
    };
    image.src = "data:image/png;base64," + base64;
  });
}



