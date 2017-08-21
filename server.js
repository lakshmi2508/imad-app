var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');


var config={
    user:'lakshmi2508',
    database:'lakshmi2508',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    saveUninitialized: false,
    cookie:{maxAge:1000 * 60 * 60 * 24 *30}
}));


/*var articles={
    'article-one':{
        title:'Article One |Harini',
        heading:'Article One',
        content:"This is content on article one"
    },
    'article-two':{
        title:'Article Two | Harini',
        heading:'Article Two',
        content:"This is content on article two"
    },
    'article-three':{
        title:'Article Three | Harini',
        heading:'Article Three',
        content:"This is content on article three"
    }
};*/

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    
    var htmlTemplate=`<html>
    <head>
        <title>${title}</title>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class='container'>
        <div>
            <a href='/'>Home</a>
        </div>
        <h3>
            ${heading}
        </h3>
        <div>
            <p>
                ${content}
            </p>
        </div>
        </div>
    </body>
</html>`;

return htmlTemplate;
}
var counter=0;

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    //return hashed.toString('hex');
    return ["pbkdf2","10000",salt,hashed.toString("hex")].join('$');
}
app.get("/hash/:input",function(req,res){
   var hashString=hash(req.params.input,'this-is-a-random-string');
   res.send(hashString);
});

app.post("/create-user",function(req,res){
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   var name="Harini";
   var email="abc@gmail.com";
   pool.query('INSERT INTO "user" (username,"name",email,password) values ($1,$2,$3,$4)',[username,name,email,dbString],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send("User added");
       }
   });
});

app.post("/login",function(req,res){
    var username=req.body.username;
   var password=req.body.password;
   
   pool.query('SELECT * FROM  "user" WHERE username=$1',[username],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           if(result.rows.length===0){
               res.status(404).send("Invalid username");
           }
           else{
               var dbString=result.rows[0].password;
               var salt=dbString.split('$')[2];
               var newpassword=hash(password,salt);
               if(newpassword===dbString){
                   //req.session.auth={userId: result.rows[0].id};
                   alert(result.rows[0].id.toString());
                   res.send("Login done!");
                   
               }
               else{
                   res.status(404).send("Invalid password");
               }
           }
           res.send("User added");
       }
   });
});

app.get('/checklogin',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       //alert("session is there");
       res.send('You are logged in '+req.session.auth.userId.toString());
   } 
   else{
       res.send('You are not logged in');
   }
});

app.get("/logout",function(req,res){
   delete req.session.auth;
   res.send("Logged out");
});

app.get("/counter", function(req,res){
  counter+=1;
  res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get("/testdb",function(err,res){
    pool.query("SELECT * from article",function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result.rows));
       }
    });
});
var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});
/*app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});*/
app.get('/articles/:articleName',function(req,res){
    pool.query("SELECT * from article_webapp where name='"+req.params.articleName+"'",function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           if(result.rows.length===0){
               res.status(404).send("No article found");
           }
           else{
       var articledata=result.rows[0];
       res.send(createTemplate(articledata));
           }
       }
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
