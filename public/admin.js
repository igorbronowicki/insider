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


    // Модель страницы
    app.models.Page = Backbone.Model.extend({
        urlRoot: '/api/pages',
        idAttribute: "_id",

        defaults: {
            "published": true
        },

        validate: function(attributes, options) {
            var result = {
                "errors": {
                    "title": [],
                    "URL": [],
                    "body_html": []
                }
            };

            if (attributes.title == "") {
                result.errors.title.push("Please enter a title.");
                result.errors.title.push("Don't be shy!");
            }

            if (attributes.URL == "") {
                result.errors.URL.push("Please enter a URL.");
            }

            if (attributes.body_html == "") {
                result.errors.body_html.push("Please enter a text.");
            }

            // Returns true if any of the values in the list pass the iterator truth test.
            var flag = _.some(result.errors, function(value) {
                return !!value.length;
            });
            if (flag) return result;
        }
    });


    /**
     * Коллекция страниц
     */
    app.collections.Pages = Backbone.Collection.extend({
        model: app.models.Page,
        url: '/api/pages',
        parse: function(response) {
            return response.pages;
        }
    });


    /**
     * View для страниц
     */
    app.views.Pages = Backbone.View.extend({
        tagName: 'div',
        id: 'pages',
        className: 'palette',

        template: $('#tpl-pages').html(),

        events: {
            "click .add"            : "_add"
        },

        initialize: function () {
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);
            this.render();
            this.collection.fetch({reset: true});
        },

        render: function(){
            this.$el.html(Mustache.render(this.template, {}));
            return this;
        },

        addOne: function (model) {
            var view = new app.views.Page({model: model});
            this.$(".list").append(view.render().el);
        },

        addAll: function () {
            this.$(".list").empty();
            this.collection.each(this.addOne, this);
        },

        _add: function(e) {
            app.views.pageDetails = new app.views.PageDetails({
                model: new app.models.Page,
                collection: this.collection
            });
            $("#container-item").empty().html(app.views.pageDetails.render().el);
        }
    });


    /**
     * View для страницы
     */
    app.views.Page = Backbone.View.extend({
        tagName: 'div',
        className: 'item',

        template: $('#tpl-page').html(),

        events: {
            "click .edit"           : "_edit",
            "click .delete"         : "_delete"
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function () {
            this.$el.html(Mustache.render(this.template, this.model.toJSON()));
            return this;
        },

        _edit: function(e) {
            app.views.pageDetails = new app.views.PageDetails({
                model: this.model,
                collection: app.collections.pages
            });
            $("#container-item").empty().html(app.views.pageDetails.render().el);
        },

        _delete: function (e) {
            this.model.destroy({wait: true});
        }
    });


    /**
     * View для страницы с детальным описанием
     */
    app.views.PageDetails = Backbone.View.extend({
        tagName: 'div',
        id: 'page-details',
        className: 'palette',

        template: $('#tpl-page-details').html(),

        events: {
            "click .save"           : "_save"
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'invalid', this.render);
            this.listenTo(this.model, 'sync', this.render);
            //model.fetch
        },

        render: function () {
            var context = {
                page: (this.model.validationError) ? this.serialize() : this.model.toJSON(),
                errors: (this.model.validationError) ? this.model.validationError.errors : null
            };
            this.$el.html(Mustache.render(this.template, context));

            return this;
        },

        serialize: function() {
            var title = this.$('[name="title"]').val();
            var published = this.$('[name="published"]').is(":checked");
            var URL = this.$('[name="URL"]').val();
            var body_html = this.$('[name="body_html"]').val();

            return {
                "title": title,
                "published": published,
                "URL": URL,
                "body_html": body_html
            };
        },

        _save: function (e) {
            var self = this;

            this.model.save(this.serialize(), {
                wait: true,
                success: function(model, response, options) {
                    self.model.set(response.page);
                    self.collection.add(model);
                }
            });
        }
    });


    /**
     * Router нашего приложения.
     */
    app.routers.Main = Backbone.Router.extend({
        routes: {
            "": "index",
            "admin/pages": "pages",
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
        }
    });


    /**
     * Инициализация нашего приложения
     */
    app.init();


    // tmp
    $("#xxx").click(function(){
        Backbone.history.navigate("admin/pages", {trigger: true, replace: false});
    });
});

