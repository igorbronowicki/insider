module.exports = function (app) {

    // pages routes
    var pages = require('./modules/pages/views');
    app.get('/api/pages', pages.all);
    app.post('/api/pages', pages.create);
    app.get('/api/pages/:pageId', pages.read);
    app.put('/api/pages/:pageId', pages.update);
    app.del('/api/pages/:pageId', pages.delete);
    app.param('pageId', pages.load);

    // admin routes
    var admin = require('./modules/admin/views');
    app.get('/admin/*', admin.home);

    // main routes
    var main = require('./modules/main/views');
    app.get('/', main.home);

};