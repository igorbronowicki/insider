/**
 * View для главной страницы Admin
 */

exports.home = function(req, res) {
    res.render('./admin/templates/index', {
        title: "Control panel"
    });
};