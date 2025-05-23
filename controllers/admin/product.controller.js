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
var changePosition = ()=>{
    return "Change Position Success ✅🎉";
}
var deleteAll = ()=>{
    return " Delete All Success ✅🎉";
}
// [GET] /admin/products
module.exports.index= async(req,res) => {
    let find = {
        deleted : false,
        
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
    .sort({position : "desc"})

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



module.exports.createProduct= async(req,res) => {
    console.log(req.body);
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage); 
    console.log(req.body);
    if(req.body.position ===""){
        const index = await Product.countDocuments();
        req.body.position = index + 1;
    } else{
        req.body.position = parseInt(req.body.position);
    }
    console.log(req.file);
    if(req.file){
        req.body.thumbnail = `./uploads/${req.file.filename}`;
    };
    const product = new Product(req.body);
    await Product.insertOne(product);
    req.flash("success","Add new Product succ");
    res.redirect(`${prefixAdmin}/products/create`);
}

// [PATCH] /admin/change-status/:status/:id
module.exports.changeStatus= async(req,res) => {

    const id = req.params.id;
    const status = req.params.status;
    await  Product.updateOne({_id : id},{status : status});
    req.flash("success",updateSuccessMessage());
    res.redirect(`${prefixAdmin}/products`);
}
// [PATCH] /admin/change-multi
module.exports.changeMulti= async(req,res) => {
    const type = req.body.type;
    const listId = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Product.updateMany({_id : {$in: listId}},{status : "active"});     
            req.flash("success",updateSuccessMessage());   
            break;
        case "inactive":
            await Product.updateMany({_id : {$in: listId}},{status : "inactive"});     
            req.flash("success",updateSuccessMessage());   
            break;
        case "delete-all":
            await Product.updateMany({_id : {$in: listId}},{deleted : true, deletedAt : new Date()});     
            req.flash("success",deleteAll());   
            break;
        case "change-position":
            for(const item of listId ){
                let [id,position] = item.split("-");
                position = parseInt(position);
                await Product.updateMany({_id : id},{position : position});     
                req.flash("success",changePosition());  
            }
             
            break;
    
        default:
            break;
    }
    res.redirect(`${prefixAdmin}/products`);
    
    
}
