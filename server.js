var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'balaji740',
    database: 'balaji740',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var articles = {
    'article-one': {
    title: 'Article One Balaji Seshadri',
    heading: 'Article one',
    date: 'Sep 05,2016',
    content: `<p>This is the content of my first article.This is the content of my first article.This is the content of my first article.
            This is the content of my first article.This is the content of my first article.This is the content of my first article.
        </p>   
        <p>This is the content of my first article.This is the content of my first article.This is the content of my first article.
            This is the content of my first article.This is the content of my first article.This is the content of my first article.
        </p>    
        <p>This is the content of my first article.This is the content of my first article.This is the content of my first article.
            This is the content of my first article.This is the content of my first article.This is the content of my first article.
        </p>`   
    },
     'article-two': {
    title: 'Article Two Balaji Seshadri',
    heading: 'Article Two',
    date: 'Sep 05,2016',
    content: `<p>This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article
        </p>   
        <p>This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.
        </p>
        <p>This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.This is the content of my second article.
        </p> `
    },
     'article-three': {
    title: 'Article Three Balaji Seshadri',
    heading: 'Article Three',
    date: 'Sep 10,2016',
    content: `<p>This is the content of my third article.This is the content of my third article.This is the content of my third article.
            This is the content of my third article.This is the content of my third article.This is the content of my third article.
        </p> 
        <p>
       This is the content of my third article.This is the content of my third article.This is the content of my third article.
            This is the content of my third article.This is the content of my third article.This is the content of my third article.
        </p> 
        <p>
        This is the content of my third article.This is the content of my third article.This is the content of my third article.
            This is the content of my third article.This is the content of my third article.This is the content of my third article.
        </p>  ` 
    },
};
function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
    <html>
    <head>
        <title>
             ${title}
        </title>
        <meta name="viewport" content="width-device-width" initial-scale="1"/>
        <link href="ui/style.css" rel="stylesheet"/>
    </head>
    <body>
    <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
        ${content}
        </div>
    </div>
    </body>
</html>`;
return htmlTemplate;
}

var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db', function (req, res) {
   pool.query('SELECT * FROM test',function(err,result){
       if(err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
   }); 
  
});

var counter = 0;
app.get('/counter',function(req, res) {
    counter = counter+1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

  //app.get('/:articleName', function (req, res) {
  app.get('articles/:articleName', function (req, res) {
  
  pool.query("SELECT * FROM article WHERE TITLE ='" + req.params.articleName + "'", function(err,result){
     if(err) {
           res.status(500).send(err.toString());
       }
       else  {
          if (result.rows.length === 0) {
              res.status(400).send('article not found');
          }
        else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
       }
       
//     {
//         res.send(JSON.stringify(result.rows));
//     }
//  
//}
  //var articleName = req.params.articleName ;   
//res.send(createTemplate(articles[articleName]));
});
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/favicon.ico', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

//app.get('/submit-name/:name', function (req, res) {

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
