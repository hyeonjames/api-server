'use strict';
const mong = require('mongoose');
const crypto = require('crypto');
const hashSecret = 'code404';
function register (name,cls) {
    module.exports[name] = cls;
    mong.Schema.Types[name] = cls;
}
function encPwd(pwd){
    const hash = crypto.createHmac('sha256',hashSecret);
    hash.update(pwd);
    return hash.digest('hex');
}

module.exports.encPwd = encPwd;

const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

const castError = mong.SchemaType.CastError;



register('Email',class Email extends mong.SchemaType{
    constructor(key,options) {
        super(key,options,'Email');
    }
    cast (val) {
        console.log('email');
        let str = String(val);
        if(!emailRegex.test(str)) {
            throw new castError('Email',`${str} is not valid email address`);
        }
        return str;
    }
});

