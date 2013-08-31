;
$(function(){
    'use strict';


    /**
     * Создание объекта нашего приложения (namespace).
     */
    window.app = {
        views: {},
        collections: {},
        models: {},
        routers: {},

        init: function() {
            app.routers.main = new app.routers.Main();
            Backbone.history.start({pushState: true});
        }
    };


    /**
     * Router нашего приложения.
     */
    app.routers.Main = Backbone.Router.extend({
        routes: {
            "": "index",
            "admin/pages": "pages",
            "admin/employees": "employees",
            //"admin/pages/:pageId": "pageDetails",
            "*foo": "index"
        },
        initialize: function() {
            // code here
        },
        index: function() {
            // code here
        },
        pages: function() {
            app.collections.pages = new app.collections.Pages;
            app.views.pages = new app.views.Pages({
                collection: app.collections.pages
            });
//            app.collections.pages.fetch({
//                success: function(collection) {
//                    app.views.pages = new app.views.Pages({
//                        collection: collection
//                    });
//                }
//            });
            $("#container-list").empty().html(app.views.pages.render().el);
        },
        employees: function() {
            app.collections.employees = new app.collections.Employees;
            app.views.employees = new app.views.Employees({
                collection: app.collections.employees
            });
            $("#container-list").empty().html(app.views.employees.render().el);
        }
    });


    // tmp
    $("#xxx-pages").click(function(){
        Backbone.history.navigate("admin/pages", {trigger: true, replace: false});
    });
    $("#xxx-employees").click(function(){
        Backbone.history.navigate("admin/employees", {trigger: true, replace: false});
    });
});