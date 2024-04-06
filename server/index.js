import proxy from 'express-http-proxy';
import express from 'express';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8888;

const app = express();
let image;

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `example.com`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

app.use(cors());
app.use(allowCrossDomain);

app.get('/image.png', (request, respond) => {
  if (image) {
    respond.send(image);
  } else {
    respond.status(404).send();
  }
  console.log("IMAGE UPLOADED", image);
});

app.post('/image.png', function(request, respond) {
  const body = '';
  filePath = __dirname + '/public/data.txt';
  request.on('data', function(data) {
    body += data;
  });

  body = image;
  respond.status(200).send();
});

app.use(proxy('https://model-8w60e25w.api.baseten.co'));

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
