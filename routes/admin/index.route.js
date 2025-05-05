const systemConfig = require("../../config/system");
const  productRoute = require("./product/product.route");
const dashboardRoute = require('./dashboard/dashboard.route');
module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    //dashboard
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
    
    //product
    app.use(`${PATH_ADMIN}/product`, productRoute);
  
}