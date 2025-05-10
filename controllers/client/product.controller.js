const Product = require("./../../models/product.model");
module.exports.index= async (req,res) => {
    const products = await Product.find({
        deleted : false,
        status : "active"
    });
     products.map((product) =>{
        product.newPrice = (product.price - (product.price * product.discountPercentage) /100).toFixed(2);
    })
    res.render("client/pages/products/index",{
        pageTitle : "Product",
        products : products,
    })
}