const express = require('express');
const app = express();
const routes = require('./routes/client/index.route.js');
require("dotenv").config();
const PORT = process.env.PORT;
const database = require('./config/database.js');
const systemConfig = require("./config/system.js")
database.connect();
app.set("views", "./views");
app.set('view engine', 'pug');
app.use(express.static("./public"));
const routeAdmin = require('./routes/admin/index.route.js')
app.locals.prefixAdmin = systemConfig.prefixAdmin;
routes(app);
routeAdmin(app);

app.listen(PORT, () => {
    console.log(`Sever is running at : ${PORT}`)
})