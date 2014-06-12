;
$(function(){
    'use strict';


    // Модель страницы
    app.models.Page = Backbone.Model.extend({
        urlRoot: '/api/pages',
        idAttribute: "_id",

        defaults: {
            "published": true,
            "parent": null,
            "position": 0
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

        prepareFuckingStuff: function() {
            var buildTree = function(_parent, all) {
                function getItemsByParent(_parent) {
                    var _parent = _parent || null; // problem with undefined

                    return _.sortBy(
                        _.filter(all, function(element) {
                            return (element.parent == _parent);
                        }), "position");
                }

                function runner(children) {
                    _.each(children, function(element) {
                        var children = getItemsByParent(element._id); // _id

                        if (children.length) {
                            element.children = [];
                            element.children.push(children);
                            runner(children);
                        }
                    });

                    return children;
                }

                return runner(getItemsByParent(_parent));
            };

            var a2 = buildTree(null, this.collection.toJSON());

            function xxx(children) {
                var result = '';

                _.each(children, function(element, index, list) {
                    if (index == 0) {
                        result += '<ol class="nestable-list">';
                    }

                    result += '<li class="nestable-item" data-id="'+element._id+'"><div class="nestable-handle"></div>';

                    if (element.children) {
                        xxx(element.children);
                    }

                    result += '</li>';

                    if (list.length == index+1) {
                        result += '</ol>';
                    }
                });

                return result;
            }

            this.$(".list").html(xxx(a2));
        },

        addOne: function (model) {
            var view = new app.views.Page({model: model});
            this.$(".list").find('[data-id="'+model.id+'"]').append(view.render().el);
        },

        addAll: function () {
            this.$(".list").empty();
            this.prepareFuckingStuff();
            this.collection.each(this.addOne, this);

            this.$(".nestable")
                .nestable()
                .on('change', function(e) {
                    var list = e.length ? e : $(e.target);
                    console.log(window.JSON.stringify(list.nestable('serialize')));
                });

            this.$('#xxx-nestable-menu')
                .on('click', function(e) {
                    var target = $(e.target),
                        action = target.data('action');

                    if (action === 'expand-all') {
                        $('.nestable').nestable('expandAll');
                    }

                    if (action === 'collapse-all') {
                        $('.nestable').nestable('collapseAll');
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