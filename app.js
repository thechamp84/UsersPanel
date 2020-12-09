require('./connections/db');
const routes = require('./routes/user.routes'); 

const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/',routes);

app.listen(2020,() => {
console.log("server is running on port 2020");
});