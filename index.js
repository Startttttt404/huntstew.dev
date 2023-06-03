const express = require('express');
const fs = require('fs')
const path = require('path')
const useragent = require('express-useragent');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(useragent.express())

app.get('/', async (req, res, next) => {
  req.url = '/index'
  next()
});

app.get('/projects', async (req, res) => {
  var beginstring = '/views/desktop'
  var endstring = '.html'
  if(req.useragent.isMobile){
    beginstring = '/views/mobile'
    endstring = "Mob.html"
  }

  const reposJson = await(fetch('https://api.github.com/users/startttttt404/repos')).then(response => response.json())
  console.log(reposJson)

  fs.readFile(__dirname + beginstring + req.path + endstring, 'utf-8', (err, htmlString) => {
    if (err){
      console.log(err)
    }
    else{
      const dom = new JSDOM(htmlString)
      const repoList = dom.window.document.body.querySelector('#repoList')
      try{
        for(const repo of reposJson){
          repoList.appendChild(JSDOM.fragment(
            '<li class="list-group-item project-item"><p><img src="https://raw.githubusercontent.com/Startttttt404/'+ repo.name + '/main/resume-site-icon.svg"</img> <a href="' + repo.html_url + '"><u><b>' + repo.name + '</b></u></a><br>' + repo.description + '</p></li>'
          ))
        }
      }
      catch{
        repoList.appendChild(JSDOM.fragment(
          '<li class="list-group-item"><p>Unable to parse repo info, probably unauth API limit</p></li>'
        ))
      }
      res.send(dom.serialize())
    }
  });
});

app.get('/download', async (req, res) => {
  console.log("Attempting to get file from:" + __dirname + '/HunterStewartResume.docx')
  res.download(__dirname + '/public/HunterStewartResume.docx', "HunterStewartResume.docx", function (err) {
    res.send("Sorry, seems to be some error with the download!")
  })
});

app.get('*', async (req, res) => {
  var beginstring = '/views/desktop'
  var endstring = '.html'
  if(req.useragent.isMobile){
    beginstring = '/views/mobile'
    endstring = "Mob.html"
  }

  fs.readFile(__dirname + beginstring + req.path + endstring, 'utf-8', (err, htmlString) => {
    if (err){
      res.status(404).end("error: 404")
    }
    else{
      res.send(htmlString)
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});