var express = require('express');
var fs = require('fs')
var path = require('path')

var app = express();
var useragent = require('express-useragent');

app.use(express.static(__dirname + '/public'));
app.use(useragent.express())

app.get('/', async (req, res) => {
  var beginstring = '/views/desktop'
  var endstring = 'index.html'
  if(req.useragent.isMobile){
    beginstring = '/views/mobile'
    endstring = "indexMob.html"
  }

  fs.readFile(__dirname + beginstring + req.path + endstring, 'utf-8', (err, html) => {
    if (err){
      console.log(err)
    }
    else{
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
      });
      res.end(html)
    }
  });
});

app.get('*', async (req, res) => {
  var beginstring = '/views/desktop'
  var endstring = '.html'
  if(req.useragent.isMobile){
    beginstring = '/views/mobile'
    endstring = "Mob.html"
  }

  fs.readFile(__dirname + beginstring + req.path + endstring, 'utf-8', (err, html) => {
    if (err){
      console.log(err)
    }
    else{
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
      });
      res.end(html)
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});