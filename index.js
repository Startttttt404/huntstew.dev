const express = require('express');
const fs = require('fs')
const path = require('path')

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
     fs.readFile(__dirname + '/public/index.html', 'utf-8', (err, text) => {
        res.statusCode = 200
        res.send(text)
     });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});