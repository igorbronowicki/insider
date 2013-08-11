$(function(){
    window.pages = {
        el: $("#pages"),
        template: $("#tpl-pages").html(),
        model: [],
        init: function() {
            this.events();
        },
        events: function() {
            var self = this;

            $("button").click(function(){
                $.ajax({
                    url: "http://127.0.0.1:3000/admin/pages.json"
                }).done(function(data) {
                        self.updateModel(data);
                    });
            });
        },
        updateModel: function(data) {
            this.model = data;
            this.render();
        },
        render: function() {
            this.el.html(Mustache.render(this.template, this.model));
        },
        empty: function() {
            this.el.empty();
        }
    };



    pages.init();




});




