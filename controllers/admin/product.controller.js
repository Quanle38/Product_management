const Product = require('./../../models/product.model');
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
module.exports.index= async(req,res) => {
    console.log(req.query.status);
    let find = {
        deleted : false
    }
    //filter status
    const filterStatus = filterStatusHelpers(req.query);
    if(req.query.status){
        find.status = req.query.status;
    }
    //endfilterstatus
    //search 
    const search = searchHelpers(req.query);
    if(req.query.keyword){
        find.title = search.regex;
    }
    //endsearch
    //pagination
    const currentPage = parseInt(req.query.page) || 1;
    const totalProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelpers({
        page : currentPage,
        limit : 5,
        totalProducts : totalProducts
    },currentPage,totalProducts)
    
    
    //endpagination
    const products = await Product
    .find(find)
    .limit(objectPagination.limit)
    .skip(objectPagination.indexStart)

    res.render("admin/pages/product/index",{
        pageTitle : "Product Page",
        products : products,
        filterStatus : filterStatus,
        keyword : search.keyword,
        totalPage : objectPagination.totalPage,
        currentPage : currentPage,
    });
}
