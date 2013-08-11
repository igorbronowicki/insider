// http://en.wikipedia.org/wiki/JSDoc

exports.pages = {
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
                        "author": "Вася",
                        "title": "Корпорация",
                        "URL": "about",
                        "visibility": "",
                        "template": ""
                    },
                    {
                        "author": "Игорь",
                        "title": "Продукция",
                        "URL": "products",
                        "visibility": "",
                        "template": ""
                    },
                    {
                        "author": "Игорь",
                        "title": "Партнерство",
                        "URL": "partnership",
                        "visibility": "",
                        "template": ""
                    },
                    {
                        "author": "Женя",
                        "title": "Пресс-центр",
                        "URL": "press",
                        "visibility": "",
                        "template": ""
                    },
                    {
                        "author": "Дима",
                        "title": "Корпоративная ответственность",
                        "URL": "corporate-responsibility",
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