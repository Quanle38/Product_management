const Product = require('./../../models/product.model');
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const { prefixAdmin } = require('../../config/system');
var updateSuccessMessage = ()=>{
    return "Change-Status Success ✅🎉";
}
var deleteSuccessMessage =()=>{
    return "Delete Success ✅🎉";
}
// [GET] /admin/products
module.exports.index= async(req,res) => {
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

// [DELETE] /admin/delete/:id
module.exports.delete= async(req,res) => {
    const id = req.params.id;
    await Product.updateOne({
        _id : id,
    },{
        deleted : true,
        deletedAt : new Date()
    })
    req.flash("success",deleteSuccessMessage());
    res.redirect(`${prefixAdmin}/products`);
}

// [GET] /admin/create
module.exports.create= async(req,res) => {
    res.render("admin/pages/product/create",{
        pageTitle : "Add New Products"
    });
    
}

// [PATCH] /admin/change-status/:status/:id
module.exports.changeStatus= async(req,res) => {

    const id = req.params.id;
    const status = req.params.status;
    await  Product.updateOne({_id : id},{status : status});
    req.flash("success",updateSuccessMessage());
    res.redirect(`${prefixAdmin}/products`);
}
