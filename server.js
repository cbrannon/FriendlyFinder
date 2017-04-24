const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use( '/app', express.static( 'app' ) );

require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

let PORT = 8080;

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});