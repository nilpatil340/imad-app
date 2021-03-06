var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'nilpatil340',
    database : 'nilpatil340',
    port : '5555',
    host : 'db.imad.hasura-app.io',
    password : 'process.env.db_password'
};

var app = express();
app.use(morgan('combined'));

var articleOne = {
    title : 'Article one | Nilesh Patil',
    heading : 'Article One',
    date : 'feb 18 , 2018',
    content : `<p>
                    hello im Nilesh, this is content of my first article.
                    hello im Nilesh, this is content of my first article.
                    hello im Nilesh, this is content of my first article.
                </p>
                <p>
                    hureyy im now a webapp developer.
                    hureyy im now a webapp developer.
                    hureyy im now a webapp developer.
                </p>
                 <p>
                    hureyy im now a webapplication developer.
                    hureyy im now a webapplication developer.
                    hureyy im now a webapplication developer.
                </p>`
};

function createTemplate(data){
    var date = data.date;
    var content = data.content;
    var heading = data.heading;
    var title = data.title;
    
    var htmlTemplate = `
                        <html>
        <head>
            <title>
               ${title}
            </title>
            <meta name="viewport" content="width=device-width , initial-scale=1"/>
            <style>
                .container{
                    max-width : 800px;
                    margin : auto;
                    color : grey;
                    font-family : red serifs;
                    padding-left : 20px;
                    padding-right : 20px;
                    padding-top : 40px;
                    padding-bottom : 40px;
                }
            </style>
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
    </html>
    
    
    `;
    
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res) {
    
    pool.query('SELECT * from test',function(err,res){
       if(err){
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result));
       }
    });
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
