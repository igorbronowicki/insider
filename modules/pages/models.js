// http://en.wikipedia.org/wiki/JSDoc



var pages = exports.pages = {
    _validate: function(ob) {
        return {
            "errors": {
                "title": [
                    "can't be blank"
                ]
            }
        };
    },


    create: function(ob) {
        // code MongoDB
        return {
            "page": ob
        };
    },


    read: function(ob) {
        if (ob) {
            return {
                "page": {
                    "author": "Dennis",
                    "title": "Sample Page",
                    "URL": "",
                    "visibility": "",
                    "template": ""
                }
            };
        } else {
            return {
                "pages": [
                    {
                        "author": "Dennis",
                        "title": "Sample Page",
                        "URL": "",
                        "visibility": "",
                        "template": ""
                    },
                    {
                        "author": "Igor",
                        "title": "Sample Page2",
                        "URL": "",
                        "visibility": "",
                        "template": ""
                    },
                    {
                        "author": "Dennis",
                        "title": "Terms of Services",
                        "URL": "",
                        "visibility": "",
                        "template": ""
                    }
                ]
            };
        }
    },


    update: function(ob) {
        return {
            "page": ob
        };
    },


    delete: function(id) {
        return {};
    }
};