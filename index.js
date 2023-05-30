var express = require('express');
var fs = require('fs')
var path = require('path')

var app = express();
var useragent = require('express-useragent');

app.use(express.static(__dirname + '/public'));
app.use(useragent.express())

app.get('/', async (req, res) => {
  if(req.useragent.isMobile){
    fs.readFile(__dirname + '/views/mobile/indexMob.html', 'utf-8', (err, text) => {
      res.statusCode = 200
      res.end(text)
    });
  }
  else{
    fs.readFile(__dirname + '/views/desktop/index.html', 'utf-8', (err, text) => {
      res.statusCode = 200
      res.end(text)
    });
  }
});

app.get('/about-me', async (req, res) => {
  fs.readFile(__dirname + '/views/desktop/about-me.html', 'utf-8', (err, text) => {
     res.statusCode = 200
     res.end(text)
  });
});

app.get('/projects', async (req, res) => {
  fs.readFile(__dirname + '/views/desktop/projects.html', 'utf-8', (err, text) => {
     res.statusCode = 200
     res.end(text)
  });
});

app.get('/resume', async (req, res) => {
  fs.readFile(__dirname + '/views/desktop/resume.html', 'utf-8', (err, text) => {
     res.statusCode = 200
     res.end(text)
  });
});

app.get('/contact', async (req, res) => {
  fs.readFile(__dirname + '/views/contact.html', 'utf-8', (err, text) => {
     res.statusCode = 200
     res.end(text)
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});