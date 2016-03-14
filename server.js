// require node packages
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var request = require('request');
var logger = require('morgan');

var PORT = process.env.PORT || 7500;

var app = express();

// config database
mongoose.connect('mongodb://localhost/scraperApplication');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//require db schema
var Article = require('./models/articleModel.js');

// set up logger
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// set up static folder
app.use(express.static("public"));


// set up handlebars
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", function(req, res) {
  // scraping truthdig
  request("https://www.truthdig.com/tag/chris+hedges", function (error, response, html) {
    var $ = cheerio.load(html);
    $("h2>a").each(function(i, element) {

      var articleTitle = $(element).text();
      var articleLink = $(element).attr('href');
      console.log(articleTitle);
      console.log(articleLink);
      // creating new instance
      var insertedArticle = new Article({
        title : articleTitle,
        link: articleLink
       });

    // saving to database
      insertedArticle.save(function(err, dbArticle) {
        if (err) {
          console.log(err);
        } else {
          console.log(dbArticle);
        }
      });
    });
    res.sendFile(process.cwd() + '/index.html')
  });
});

// listen on port
app.listen(PORT, function() {
  console.log("App running on port %s", PORT);
});