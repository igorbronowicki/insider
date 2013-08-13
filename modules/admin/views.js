// http://en.wikipedia.org/wiki/JSDoc

exports.admin = {
    main: function(req, res) {
        res.render('./admin/templates/index', {
            title: "Control panel"
        });
    }
};