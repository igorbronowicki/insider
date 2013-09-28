;
$(function(){
    'use strict';


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

            //this.$("#xxx-nestable").nestable();
            $('#xxx-nestable')
            .nestable()
            .on('change', function(e) {
                console.log(e);
//                var list   = e.length ? e : $(e.target),
//                    output = list.data('output');
//                if (window.JSON) {
//                    output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
//                } else {
//                    output.val('JSON browser support required for this demo.');
//                }
            });

            $('#xxx-nestable-menu').on('click', function(e) {
                var target = $(e.target),
                    action = target.data('action');

                if (action === 'expand-all') {
                    $('#xxx-nestable').nestable('expandAll');
                }

                if (action === 'collapse-all') {
                    $('#xxx-nestable').nestable('collapseAll');
                }
            });
        },

        _add: function(e) {
            app.views.pageDetails = new app.views.PageDetails({
                model: new app.models.Page,
                collection: this.collection
            });
            $("#container-editing").empty().html(app.views.pageDetails.render().el);
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
            $("#container-editing").empty().html(app.views.pageDetails.render().el);
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
            //this.listenTo(this.model, 'sync', this.render);
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


});