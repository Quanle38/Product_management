const Product = require('./../../models/product.model');
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
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
    const products = await Product.find(find); 

    res.render("admin/pages/product/index",{
        pageTitle : "Product Page",
        products : products,
        filterStatus : filterStatus,
        keyword : search.keyword
    });
}
