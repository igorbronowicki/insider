var views = require('./modules/pages/views');
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
//    var context = {
//        module1: views.module1.render(),
//        module2: views.module2.render(),
//        module3: views.module3.render(),
//    };
    res.render('base', {
        title: "Home page"
    });
};
var adminPage = function(req, res) {
    res.render('./admin/index', {
        title: "Control panel"
    });
};


// URL dispatcher (URLconf in Django)
app.get('/', homePage);

app.get('/admin/', adminPage); // Как передавать управление локальному URLconf модуля? + тут может быть middleware Auth
app.get('/admin/pages.json', views.pages.read);


// такое...
app.listen(3000);
console.log('check 127.0.0.1:3000 out');