/**
 * View для главной страницы Main
 */

exports.home = function(req, res) {
    res.render('./main/templates/base', {
        title: "Home page"
    });
};