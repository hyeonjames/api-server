const errorCodes = {
    'a01' : '로그인 후에 이용가능합니다.',
    'a02' : '이미 가입된 상태에서는 회원가입을 할 수 없습니다.',
    
    
    'db01' : '데이터베이스 접근중 오류가 발생 했습니다.'
}

module.exports = function (code, ...args){
    let err = errorCodes[code];
    let message = '';
    if(!err){
        return {
            error : true,
            code :code
        };
    }
    if(typeof(err) == 'function'){
        message = err(...args);
    } else if(typeof(err) == 'string') {
        message = err.replace(/{(\d+)}/g,function (index){
            return args[index];
        });
    }
    return {
        error :true,
        code : code,
        message : err
    };
}