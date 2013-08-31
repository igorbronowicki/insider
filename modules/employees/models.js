/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

/**
 * Employee Schema
 */

var EmployeeSchema = new Schema({
    "author": String,
    "created_at": String,
    "handle": String,
    "full_name": String,
    "position": String,
    "photo": String,
    "story": String,
    "visibility": String,
    "updated_at": String,
    "template_suffix": String,
    "published": String
});

mongoose.model('Employee', EmployeeSchema);