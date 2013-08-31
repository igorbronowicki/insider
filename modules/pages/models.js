/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

/**
 * Page Schema
 */

var PageSchema = new Schema({
    "author": String,
    "body_html": String,
    "created_at": String,
    "handle": String,
    "title": String,
    "URL": String,
    "visibility": String,
    "updated_at": String,
    "template_suffix": String,
    "published": String
});

mongoose.model('Page', PageSchema);