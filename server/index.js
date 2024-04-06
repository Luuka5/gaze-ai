import proxy from 'express-http-proxy';
import express from 'express';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8888;

const app = express();
app.use(cors());

app.use('/', proxy('https://model-8w60e25w.api.baseten.co'));
/*
app.use('/public', express.static(__dirname + '/public'));


app.post('/image', function(request, respond) {
  var body = '';
  filePath = __dirname + '/public/data.txt';
  request.on('data', function(data) {
    body += data;
  });

  request.on('end', function() {
    fs.appendFile(filePath, body, function() {
      respond.end();
    });
  });
});
*/
app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
