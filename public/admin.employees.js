;
$(function(){
    'use strict';


    // Модель сотрудника
    app.models.Employee = Backbone.Model.extend({
        urlRoot: '/api/employees',
        idAttribute: "_id",

        defaults: {
            "published": true
        },

        validate: function(attributes, options) {
            var result = {
                "errors": {
                    "full_name": [],
                    "position": [],
                    "story": []
                }
            };

            if (attributes.full_name == "") {
                result.errors.full_name.push("Please enter a full name.");
                result.errors.full_name.push("Don't be shy!");
            }

            if (attributes.position == "") {
                result.errors.position.push("Please enter a position.");
            }

            if (attributes.story == "") {
                result.errors.story.push("Please enter a story.");
            }

            // Returns true if any of the values in the list pass the iterator truth test.
            var flag = _.some(result.errors, function(value) {
                return !!value.length;
            });
            if (flag) return result;
        }
    });


    /**
     * Коллекция сотрудников
     */
    app.collections.Employees = Backbone.Collection.extend({
        model: app.models.Employee,
        url: '/api/employees',
        parse: function(response) {
            return response.employees;
        }
    });


    /**
     * View для сотрудников
     */
    app.views.Employees = Backbone.View.extend({
        tagName: 'div',
        id: 'employees',
        className: 'palette',

        template: $('#tpl-employees').html(),

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
            var view = new app.views.Employee({model: model});
            this.$(".list").append(view.render().el);
        },

        addAll: function () {
            this.$(".list").empty();
            this.collection.each(this.addOne, this);
        },

        _add: function(e) {
            app.views.employeeDetails = new app.views.EmployeeDetails({
                model: new app.models.Employee,
                collection: this.collection
            });
            $("#container-item").empty().html(app.views.employeeDetails.render().el);
        }
    });


    /**
     * View для сотрудника
     */
    app.views.Employee = Backbone.View.extend({
        tagName: 'div',
        className: 'item',

        template: $('#tpl-employee').html(),

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
            app.views.employeeDetails = new app.views.EmployeeDetails({
                model: this.model,
                collection: app.collections.employees
            });
            $("#container-item").empty().html(app.views.employeeDetails.render().el);
        },

        _delete: function (e) {
            this.model.destroy({wait: true});
        }
    });


    /**
     * View для сотрудника с детальным описанием
     */
    app.views.EmployeeDetails = Backbone.View.extend({
        tagName: 'div',
        id: 'employee-details',
        className: 'palette',

        template: $('#tpl-employee-details').html(),

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
                employee: (this.model.validationError) ? this.serialize() : this.model.toJSON(),
                errors: (this.model.validationError) ? this.model.validationError.errors : null
            };
            this.$el.html(Mustache.render(this.template, context));

            return this;
        },

        serialize: function() {
            var full_name = this.$('[name="full_name"]').val();
            var published = this.$('[name="published"]').is(":checked");
            var position = this.$('[name="position"]').val();
            var story = this.$('[name="story"]').val();

            return {
                "full_name": full_name,
                "published": published,
                "position": position,
                "story": story
            };
        },

        _save: function (e) {
            var self = this;

            this.model.save(this.serialize(), {
                wait: true,
                success: function(model, response, options) {
                    self.model.set(response.employee);
                    self.collection.add(model);
                }
            });
        }
    });


});