var mongoose = require('mongoose'),
    Page = mongoose.model('Page');

/**
 * Получить список всех страниц из БД и вернуть в виде JSON
 */

exports.read = function (req, res) {
    Page.find({}, function(error, pages) {
        if (error) {
            // show error
        } else {
            res.json(200, {
                "pages": pages
            });
        }
    });
};