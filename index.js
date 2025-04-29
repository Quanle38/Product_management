const express = require('express');
const app = express();
const routes = require('./routes/client/index.route.js');
require("dotenv").config();
const PORT = process.env.PORT;

app.set("views", "./views");
app.set('view engine', 'pug');

routes(app);

app.listen(PORT, () => {
    console.log(`Sever is running at : ${PORT}`)
})