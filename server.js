const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

require('./app/routing/htmlRoutes')(app);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});