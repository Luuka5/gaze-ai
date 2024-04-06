

async function start() {
    const resp = await fetch(
        'https://model-8w60e25w.api.baseten.co/development/predict',
        {
          method: 'POST',
          headers: { Authorization: 'Api-Key EVlZTrUE.UcbCHD6uN6LtatFcFd74hD1j6DG7IqDc' },
          body: JSON.stringify({"workflow_values": 
          {"negative_prompt": "blurry, text, low quality", 
          "positive_prompt": "An igloo on a snowy day, 4k, hd", 
         }}),
        }
      );
    
      const data = await resp.json();
      console.log(data);

    const base64 = data.result[0].data;
    const buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(path.join(__dirname, 'output.jpg'), buffer);

}



