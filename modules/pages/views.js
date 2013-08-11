// http://en.wikipedia.org/wiki/JSDoc

var models = require('./models');
var templates = {};

exports.pages = {
    create: function(req, res) {

    },
    read: function(req, res) {
        var pages = models.pages.read();
        res.json(200, pages);
    },
    update: function(req, res) {

    },
    delete: function(req, res) {

    }
};