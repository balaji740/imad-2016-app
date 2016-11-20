var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var Pool = require('pg').Pool;
var config = {
    user: 'balaji740',
    database: 'balaji740',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
//var articles = {
//    'article-one': {
//    title: 'Article One Balaji Seshadri',
//    heading: 'Article one',
//    date: 'Sep 05,2016',
//    content: `<p>This is the content of my first article.This is the content of my first article.This is the content of my first article//.
//            This is the content of my first article.This is the content of my first article.This is the content of my first article.
//        </p>   
//        <p>This is the content of my first article.This is the content of my first article.This is the content of my first article.
//            This is the content of my first article.This is the content of my first article.This is the content of my first article.
//        </p>    
//        <p>This is the content of my first article.This is the content of my first article.This is the content of my first article.
//            This is the content of my first article.This is the content of my first article.This is the content of my first article.
//        </p>`   
//    },
//     'article-two': {
//    title: 'Article Two Balaji Seshadri',
//    heading: 'Article Two',
//    date: 'Sep 05,2016',
//    content: `<p>This is the content of my second article.This is the content of my second article.This is the content of my second //article.This is the content of my second article.This is the content of my second article.This is the content of my second article
//        </p>   
//        <p>This is the content of my second article.This is the content of my second article.This is the content of my second article//.This is the content of my second article.This is the content of my second article.This is the content of my second article.
    //    </p>
    //    <p>This is the content of my second article.This is the content of my second article.This is the content of my second article//.This is the content of my second article.This is the content of my second article.This is the content of my second article.
 //       </p> `
//    },
//     'article-three': {
//    title: 'Article Three Balaji Seshadri',
//    heading: 'Article Three',
//    date: 'Sep 10,2016',
//    content: `<p>This is the content of my third article.This is the content of my third article.This is the content of my third article//.
//            This is the content of my third article.This is the content of my third article.This is the content of my third article.
//        </p> 
//        <p>
//       This is the content of my third article.This is the content of my third article.This is the content of my third article.
//            This is the content of my third article.This is the content of my third article.This is the content of my third article.
//        </p> 
//        <p>
//        This is the content of my third article.This is the content of my third article.This is the content of my third article.
//            This is the content of my third article.This is the content of my third article.This is the content of my third article.
//        </p>  ` 
//    },
//};
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
            ${date.toDateString()}
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
app.use(bodyParser.json());
app.use(session({
    secret: 'randomvalue' ,
    cookie: {maxAge: 1000*60*60*24*30}
    
}));


app.get('/', function (req, res) {
  //console.log('index1');
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  //console.log('index2');
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
   
}
app.get('/hash/:input', function(req,res){
    var hashedString = hash(req.params.input,'random-string');
    res.send(hashedString);
    });
    
app.post('/create-user', function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)' , [username,dbString], function(err, result) {
        
  if(err) {
           res.status(500).send(err.toString());
       } else {
           res.send('User successfully created ' + username);
       }
   }); 
  
});

app.post('/login', function(req,res) {
    console.log('user inv00');
    var username = req.body.username;
    var password = req.body.password;
//    console.log('user inv01');
//    console.log('bef query');
    pool.query('SELECT * FROM "user" WHERE username = $1' , [username], function(err, result) {
        if(err) {
           res.status(500).send(err.toString());
       } else {
           if (result.rows.length === 0) {
 //              console.log('user inv1');
               res.send(403).send('username/password is invalid');
           } else {
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password,salt);
              if (hashedPassword === dbString) {
                  req.session.auth = {userId: result.rows[0].id};
  //                 console.log('cred correct');
              res.send('credentials are correct');
             } else {
  //             console.log('user inv2');
               res.sendStatus(403).send('username/password is invalid');
//               console.log('user inv3');
             }
              
           }
           
       }
   }); 
  
});

app.get('/check-login', function (req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
        res.send('You are Logged in:' + req.session.auth.userId.toString());
    }else{
        res.send('you are not logged in');
    }
});
app.get('/logout', function(req, res){
    delete req.session.auth;
    res.send('logged out');
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
  app.get('/articles/:articleName', function (req, res) {
  
  //pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName +"'", function(err,result){
  pool.query("SELECT * FROM article WHERE TITLE = $1", [req.params.articleName], function(err,result){
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
