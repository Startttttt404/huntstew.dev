const express = require('express');

const app = express();

app.get('/', async (req, res) => {
     res.statusaCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     res.end('Hello World!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});
