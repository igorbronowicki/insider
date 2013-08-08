var db = require('./db');
var express = require('express');
var app = express();


// Routes

// Главная страница сайта
app.get('/', function(req, res) {
    res.send(200, 'Hello world!');
});

/*
 * Receive a list of all Pages
 */
app.get('/v2/pages.json', function(req, res) {
    var pages = db.getPages();
    res.json(200, pages);
});


// такое...
app.listen(3000);
console.log('check 127.0.0.1:3000 out');