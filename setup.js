var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/insider");

require('./modules/pages/models');

var Page = mongoose.model('Page');

Page.create({
    "title": "Корпорация1",
    "URL": "about1"
}, function(error) {});

Page.create({
    "title": "Корпорация2",
    "URL": "about2"
}, function(error) {});

Page.create({
    "title": "Корпорация3",
    "URL": "about3"
}, function(error) {});

Page.create({
    "title": "Корпорация4",
    "URL": "about4"
}, function(error) {});

Page.create({
    "title": "Корпорация5",
    "URL": "about5"
}, function(error) {});