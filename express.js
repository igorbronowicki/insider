var express = require('express'),
    ejs = require('ejs');
    ejs.open = '[%';
    ejs.close = '%]';

module.exports = function (app) {
    app.engine('html', ejs.__express);
    app.set('views', __dirname + '/modules');
    app.set('view engine', 'html');
    app.use('/static', express.static(__dirname + '/public'));
    app.use('/uploads', express.static(__dirname + '/uploads'));
    app.use(express.bodyParser({
        uploadDir: __dirname + '/uploads',
        keepExtensions: true
    }));
};