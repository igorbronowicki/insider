module.exports = function (app) {

    // pages routes
    var pages = require('./modules/pages/views');
    app.get('/api/pages', pages.all);
    app.post('/api/pages', pages.create);
    app.get('/api/pages/:pageId', pages.read);
    app.put('/api/pages/:pageId', pages.update);
    app.del('/api/pages/:pageId', pages.delete);
    app.param('pageId', pages.load);

    // employees routes
    var employees = require('./modules/employees/views');
    app.get('/api/employees', employees.all);
    app.post('/api/employees', employees.create);
    app.get('/api/employees/:employeeId', employees.read);
    app.put('/api/employees/:employeeId', employees.update);
    app.del('/api/employees/:employeeId', employees.delete);
    app.param('employeeId', employees.load);

    // admin routes
    var admin = require('./modules/admin/views');
    app.get('/admin/*', admin.home);

    // main routes
    var main = require('./modules/main/views');
    app.get('/', main.home);

};