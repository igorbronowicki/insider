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

        init: function() {
            this.collections.pages = new this.collections.Pages;
            this.views.pages = new this.views.Pages({
                collection: this.collections.pages
            });
        }
    };


    // Модель страницы
    app.models.Page = Backbone.Model.extend({
        idAttribute: "_id"
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
        el: $('#pages'),
        template: $('#tpl-pages').html(),
        initialize: function () {
            this.collection.bind('destroy', this.render, this);
            this.collection.bind('reset', this.render, this); // этот this вместо нижней строки?
            //_.bindAll(this, "_add", "_edit"); // актуально?
        },
        events: {
            "click .add"            : "_add",
            "click .edit"           : "_edit",
            "click .delete"         : "_delete"
        },
        render: function(){
            var template = this.template;
            var context = {
                pages: this.collection.toJSON()
            };
            this.$el.html(Mustache.render(template, context));

            return this;
        },
        _add: function(e) {
            // code here
        },
        _edit: function(e) {
            var id = $(e.target).closest("[data-id]").attr("data-id");
            var model = this.collection.get(id);
            // code here
        },
        _delete: function(e) {
            var id = $(e.target).closest("[data-id]").attr("data-id");
            var model = this.collection.get(id);
            model.destroy({wait: true});
        }
    });


    // ???
    app.init();


    // tmp
    $("#xxx").click(function(){
        app.collections.pages.fetch({reset: true});
    });
});

