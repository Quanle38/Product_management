module.exports = (query)=>{
    let objectkeyword = {
        keyword : ""
    }
    if(query.keyword){
        objectkeyword.keyword = query.keyword;
        const regex = new RegExp(query.keyword,"i");
        objectkeyword.regex = regex;
        
    }
    return objectkeyword;
}