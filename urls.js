module.exports = function (app) {

    // pages routes
    var pages = require('./modules/pages/views');
    app.get('/admin/pages.json', pages.read);

    // admin routes
    var admin = require('./modules/admin/views');
    app.get('/admin/', admin.home);

    // main routes
    var main = require('./modules/main/views');
    app.get('/', main.home);

};