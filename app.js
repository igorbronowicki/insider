//var views = {};
//var views.pages = require('./apps/pages');
var ejs = require('ejs');
ejs.open = '[%';
ejs.close = '%]';
var express = require('express');
var app = express();


// app configuration
app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
app.use('/static', express.static(__dirname + '/public'));


// tmp
var homePage = function(req, res) {
    res.render('base', {
        title: "Control panel"
    });
};
var adminPage = function(req, res) {
    res.render('./admin/index', {
        title: "Control panel"
    });
};
var pagesJSON = function(req, res) {
    var a = {pages:[{"title":"dro"}]};
    res.json(200, a);
};


// URL dispatcher (URLconf in Django)
app.get('/', homePage);

app.get('/admin/', adminPage);
app.get('/admin/pages.json', pagesJSON);


// такое...
app.listen(3000);
console.log('check 127.0.0.1:3000 out');