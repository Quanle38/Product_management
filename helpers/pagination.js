module.exports = (objectPagination,currentPage,totalProducts)=>{
    const totalPage = Math.ceil(totalProducts/objectPagination.limit);
    const indexStart = (currentPage - 1)*objectPagination.limit;
    return objectPagination ={
        indexStart : indexStart,
        totalPage : totalPage,
        limit : objectPagination.limit
    }
}