const {Account} = require('./routes/account.js');
const {Promise} = require( 'bluebird');
class Session
{
    constructor (req, row) {
        req.session.sessionInstance = this;
        for(var idx in row){
            this[idx] = row[idx];
        }
        req.session.save();
    }
    static getInstance(req){
        return req.session.sessionInstance || null;
    }
    update(){
        return new Promise((resolve,reject)=>{
            Account.findOne({
                acc_no : this.accountNo
            },(err,row)=>{
                if(err){
                    reject(err);
                }
                else if(!row){
                    reject(err);
                }
                else {
                    this.email = row.email;
                    this.name = row.name;
                    this.level = row.level;
                    resolve(this);
                }
            });
        });
    }
}

module.exports = Session;