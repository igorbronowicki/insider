// http://en.wikipedia.org/wiki/JSDoc

exports.insider = {
    main: function(req, res) {
        //    var context = {
        //        module1: views.module1.render(),
        //        module2: views.module2.render(),
        //        module3: views.module3.render(),
        //    };
        res.render('./insider/base', {
            title: "Home page"
        });
    }
};


