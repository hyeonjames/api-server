let $ = {
    extend (obj,copy){
        for(var i in copy){
            obj[i] = copy[i];
        }
    },
    isArray (obj){
        return typeof(obj.length) == 'number';
    },
    each( collection, func ) {
        if($.isArray(collection)) {
            for(var i=0;i<collection.length;i++){
                if(func(i,collection[i]) === false){
                    break;
                }
            }
        } else {
            for(var index in collection){
                if(func(index,collection[index])===false){
                    break;
                }
            }
        }
    }
}

$.extend(String.prototype,{
    format(...args){
        return this.replace(/\{(\d+)\}/g,function (match,key){
            return args[key];
        });
    },
    mapping(obj){
        return this.replace(/\{(.+)\}/g, (match,key)=>{
            return obj[key];
        })
    }
});

$.extend(Date.prototype,{
    
});

$.extend(Number.prototype,{
    
});

module.exports = $;