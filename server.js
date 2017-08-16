var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
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
};

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
app.get("/counter", function(req,res){
  counter+=1;
  res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});
app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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
