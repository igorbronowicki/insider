var ejs = require('ejs');
ejs.open = '[%';
ejs.close = '%]';

var express = require('express');
var app = express();


// app configuration
app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/modules');
app.set('view engine', 'html');
app.use('/static', express.static(__dirname + '/public'));


// URL dispatcher (URLconf in Django)
app.get('/', require('./modules/insider/views').insider.main);

app.get('/admin/', require('./modules/admin/views').admin.main); // Как передавать управление локальному URLconf модуля? + тут может быть middleware Auth
app.get('/admin/pages.json', require('./modules/pages/views').pages.read);


// такое...
app.listen(3000);
console.log('check 127.0.0.1:3000 out');