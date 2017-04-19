const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");

module.exports = function(app) {
    app.get('/api/friends', (req, res) => {
        res.sendFile(path.join(__dirname, '../data', 'friends.js'));
    });

    app.post('/api/friends', function (req, res) {
        let filePath = __dirname + '../data/friends.js';
        let requestData = "";
        req.on('data', function(data) {
             fs.readFile( filePath, 'utf8', (err, fileData) => {
                let newData = JSON.parse( fileData );
                requestData += fileData;
                console.log(requestData);
            });
        });

        // req.on('end', function (){
        //     fs.appendFile(filePath, body, function() {
        //         res.end();
        //     });
        // });
    });
}