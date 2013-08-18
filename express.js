var express = require('express'),
    ejs = require('ejs');
    ejs.open = '[%';
    ejs.close = '%]';

module.exports = function (app) {
    app.engine('html', ejs.__express);
    app.set('views', __dirname + '/modules');
    app.set('view engine', 'html');
    app.use('/static', express.static(__dirname + '/public'));
};