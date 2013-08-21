var mongoose = require('mongoose'),
    Page = mongoose.model('Page'),
    _ = require('underscore');

/**
 * List of pages
 */
exports.all = function(req, res) {
    Page.find({}, function(err, pages) {
        if (err) {
            res.json(200, {
                err: "Не получилось достать все страницы из БД!"
            });
        } else {
            res.json(200, {
                "pages": pages
            });
        }
    });
};

/**
 * Delete an page
 */
exports.delete = function(req, res) {
    var page = req.page;

    page.remove(function(err) {
        if (err) {
            res.json(200, {
                err: "Не получилось удалить страницу из БД!"
            });
        } else {
            res.json(200, {
                "page": page
            });
        }
    });
};

/**
 * Create a page
 */
exports.create = function(req, res) {
    var page = new Page(req.body);

    page.save(function(err) {
        res.json(200, {
            "page": page
        });
    });
};

/**
 * Update a page
 */
exports.update = function(req, res) {
    var page = req.page;

    page = _.extend(page, req.body);

    page.save(function(err) {
        res.json(200, {
            "page": page
        });
    });
};

/**
 * Show an page
 */
exports.read = function(req, res) {
    res.json(200, {
        "page": req.page
    });
};

/**
 * Find page by id
 */
exports.load = function(req, res, next, id) {
    Page.load(id, function(err, page) {
        if (err) return next(err);
        if (!page) return next(new Error('Failed to load article ' + id));
        req.page = page;
        next();
    });
};