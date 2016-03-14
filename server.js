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
mongoose.connect('mongodb://localhost/scraperApp');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// set up logger
app.use(logger("dev"));
app.use(bodyparser.urlencoded({
  extended: false
}));

// set up static folder
app.use(express.static("public"));


// set up handlebars
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// listen on port
app.listen(PORT, function() {
  console.log("App running on port %s", PORT);
});