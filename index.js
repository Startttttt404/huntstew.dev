const express = require('express');
const path = require('path')

const app = express();

app.get('/', async (req, res) => {
     res.statusCode = 200;
     res.sendFile(path.join(__dirname+'/index.html'))
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});