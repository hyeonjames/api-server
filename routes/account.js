'use strict';
const $m = require('mongoose');
const autoIncrement = require('mongoose-sequence')
const Session = require('../session.js');
const error = require('../error.js');
const nodemailer = require('nodemailer');
let {Email,Password,encPwd} = require('../validate.js');


let transporter = nodemailer.createTransport('smtps://tmdgus0118%40gmail.com:upmg38149404@smtp.gmail.com')

let randomCode = [];
for(var i=0;i<26;i++) {
    randomCode.push( String.fromCharCode('a'.charCodeAt(0) + i));
    randomCode.push( String.fromCharCode('A'.charCodeAt(0) + i));
    if(i < 10){
        randomCode.push( String.fromCharCode('0'.charCodeAt(0) + i));
    }
}
randomCode.push('_');

let AccountSchema = new $m.Schema({
    email : {type : Email},
    name : {type : String, minlength : 3},
    password : {type : String },
    level : {type : Number, default: 1},
    registDate : { type : Date, default : new Date()},
    verified : {type : Boolean, default : false},
    registCode : { type : String , default : ()=>{
        // 처음등록할때 64바이트의 랜덤코드를 부여함
        let length = 64;
        let ret = '';
        for(let i=0;i<length;i++) {
            let idx = Math.floor(Math.random()*(randomCode.length));
            ret += randomCode[idx];
        }
        return ret;
    } }
});

AccountSchema.plugin(autoIncrement,{inc_field : 'acc_no'});

let Account = $m.model('account',AccountSchema);

module.exports = (router, app) => {
    router.get('/', (req,res)=>{
        // 세션 계정정보 가져온다
        let ses = Session.getInstance(req);
        if(ses){
            res.send({
                email : ses.email,
                name : ses.name,
                level : ses.level
            });
        } else {
            res.send({
                email : '',
                name : 'guest',
                level : 0
            });
        }
    });
    router.post('/signup',(req,res)=>{
        let ses = Session.getInstance(req);
        if(ses){
            res.send(error('a02'));
        } else {
            console.log('here');
            Account.findOne({email : req.body.email},function (err,row){
                console.log(err,row);
                if(err){
                    res.send(error('db01'));
                } else {
                    if(!row){     
                        let acc = new Account({
                            email : req.body.email,
                            password : encPwd(req.body.pw),
                            name : 'newbie'
                        });
                        acc.save((err)=>{
                            if(err){
                                res.send(error('db01'));
                                return;
                            }
                            transporter.sendMail({
                                from : 'Code404',
                                to : req.body.email,
                                subject : 'Welcome to Code404',
                                html : `<p>code404에 가입하신것을 축하합니다.<br/>계정인증은 <b>http://code404.co.kr/accounts/auth/${acc.acc_no}/${acc.registCode}</b> 에서 하실수 있습니다.</p>`
                            },(err,info)=>{
                                if(err){
                                    
                                } else {
                                    
                                    res.send('1');
                                }
                            })
                        });
                    } else {
                        res.send('0');
                    }
                }
            })
        }
    });
    app.get('/accounts/auth/:accNo/:code',(req,res)=>{
        Account.findOne({
            acc_no : Number(req.params.accNo),
            registCode : req.params.code,
            verified : false
        },(err,row)=>{
            if(err){
                
            } else {
                if(!row){
                    res.render('auth',{
                        verified : false
                    });
                } else {
                    row.verified = true;
                    row.save((err,row)=>{
                        if(err){
                            
                        } else {
                            res.render('auth',{
                                verified : true
                            });
                        }
                    });
                }
            }
        })
    });
    router.post('/signin',(req,res)=>{
        let ses = Session.getInstance(req);
        if(ses){
            res.send(error('a02'));
        } else {
            console.log(req.body.pw,encPwd(req.body.pw));
            Account.findOne({email : req.body.email , password : encPwd(req.body.pw)}
            , (err,row)=>{
                if(err){
                    res.send(error('db01'));
                } else {
                    if(!row){
                        res.send('0');
                    } else {
                        new Session(req,row);
                        res.send({
                            email : row.email,
                            name : row.name,
                            level : row.level
                        });
                    }
                }
            })
            
        }
    });
    
    
}
module.exports.Account = Account;