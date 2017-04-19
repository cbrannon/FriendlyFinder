const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

app.use(express.static(__dirname + '/app'));

app.listen(8080);