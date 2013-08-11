// http://en.wikipedia.org/wiki/JSDoc

var models = require('./models');
var templates = {};

exports.pages = {
    read: function(req, res) {
        var pages = models.pages.read();
        res.json(200, pages);
    },
    create: function(req, res) {

    },
    update: function(req, res) {

    },
    delete: function(req, res) {

    }
};