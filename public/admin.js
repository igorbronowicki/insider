;
$(function(){
    'use strict';


    /**
     * Создание объекта нашего приложения (namespace).
     */
    window.app = {
        views: {},
        collections: {},

        init: function() {
            this.collections.pages = new this.collections.Pages;
            this.views.pages = new this.views.Pages({
                collection: this.collections.pages
            });
        }
    };


    /**
     * Коллекция страниц
     */
    app.collections.Pages = Backbone.Collection.extend({
        url: '/admin/pages.json',
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
            this.collection.bind('add', this.render, this);
        },
        render: function(){
            var template = this.template;
            var context = {
                pages: this.collection.toJSON()
            };
            this.$el.html(Mustache.render(template, context));

            return this;
        }
    });


    // ???
    app.init();


    // tmp
    $("#xxx").click(function(){
        app.collections.pages.fetch();
    });
});

