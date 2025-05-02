const systemConfig = require("../../config/system")
module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.get(PATH_ADMIN + "/dashboard",(req,res)=>{
        res.render("admin/pages/dashboard/index")
    })
}