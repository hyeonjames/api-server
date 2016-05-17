'use strict';
const $m = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Session = require('../session.js');
const error = require('../error.js');

let BoardSchema = new $m.Schema({
    name : {type : String},
    read_lv : Number,
    write_lv : Number,
    list_lv : Number
});

BoardSchema.plugin(autoIncrement,{inc_field : 'board_no'});
let Board = $m.model('board',BoardSchema);

Board.findByNo = (num)=>{
    return new Promise((resolve,reject)=>{
        Board.findOne({
            board_no : num
        },(err,row)=>{
            if(err ){
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = (router,app)=>{
    
}
module.exports.Board = Board;