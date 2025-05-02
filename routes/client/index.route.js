const productRoute = require("./products/product.route")
const homeRoute = require("./home/home.route") 
module.exports = (app) => {
    app.use("/",homeRoute)

    app.use("/products", productRoute);
};

