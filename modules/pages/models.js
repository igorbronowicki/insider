/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

/**
 * Article Schema
 */

var PageSchema = new Schema({
    "author": String,
    "title": String,
    "URL": String,
    "visibility": String,
    "template": String
});

mongoose.model('Page', PageSchema);