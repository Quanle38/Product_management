const express = require('express');
const app = express();
const routes = require('./routes/client/index.route.js');
require("dotenv").config();
const PORT = process.env.PORT;
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const database = require('./config/database.js');
const systemConfig = require("./config/system.js")
database.connect();
//boby
app.use(methodOverride('_method'));
//app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//set view engine 
app.set("views", "./views");
app.set('view engine', 'pug');
app.use(cookieParser("quandefault"))
app.use(session({cookie:{maxAge:6000}}));
app.use(flash());

app.use(express.static("./public"));


//route
const routeAdmin = require('./routes/admin/index.route.js')
app.locals.prefixAdmin = systemConfig.prefixAdmin;
routes(app);
routeAdmin(app);

app.listen(PORT, () => {
    console.log(`Sever is running at : ${PORT}`)
})