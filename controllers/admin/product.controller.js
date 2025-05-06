const Product = require('./../../models/product.model')
module.exports.index= async(req,res) => {
    console.log(req.query.status);
    const products = await Product.find({
        deleted : false
    }).limit(5) 
    res.render("admin/pages/product/index",{
        pageTitle : "Product Page",
        products : products
    });
}
