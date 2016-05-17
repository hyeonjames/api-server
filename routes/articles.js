'use strict';
const $m = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Session = require('../session.js');
const error = require('../error.js');

let ArticleSchema = new $m.Schema({
    title : {type : String},
    acc_no : Number,
    
})