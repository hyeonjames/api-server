'use strict';

let Session = require('../session.js');

module.exports = (router)=>{
    router.get('/',(req,res)=>{
        let ses = Session.getInstance();
        let user = null;
        if(ses == null){
            user = {
                name : 'guest',
                email : ''
            }
        }
    });
}