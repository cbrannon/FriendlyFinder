const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require("fs");


module.exports = function(app) {
    // Add this line below
    app.use(bodyParser.urlencoded({ extended: true })) 

    app.use(bodyParser.json());

    app.get('/api/friends', function (req, res) {
        res.sendFile(path.join(__dirname, '../data', 'friends.js'));
    });

    app.post('/api/friends', function (req, res) {
        
        console.log(req.body);


        // res.end(JSON.stringify(req.body));
        // // Saving the request method as a variable.
        // var requestData = "";
        // // When the server receives data, it will add it to requestData.
        // req.on("data", function(data) {
        //     console.log(res);
        //     requestData += data;
        //     console.log("You just posted some data to the server!");
        //     console.log("Your data was " + requestData);
        // });

        // // When the request has ended...
        // req.on("end", function() {
        //     res.write("<html><head><title>Hello Noder!</title></head><body>");
        //     res.write("<h1>Thank You!</h1>");
        //     res.write("</body></html>");
        //     res.end();
        // });
    });

    

    // app.get('/api/friends', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../data', 'friends.js'));
    // });

    // app.post('/api/friends', function (req, res) {
    //     let filePath = '../data/friends.js';
    //     let requestData = "";
    //     req.on('data', function(data) {
    //         // console.log(data);
    //          fs.readFile( filePath, 'utf8', (err, fileData) => {
    //             let newData = JSON.parse( fileData );
    //             requestData += fileData;
    //             // console.log(requestData);
    //         });
    //     });

    //     // req.on('end', function (){
    //     //     fs.appendFile(filePath, body, function() {
    //     //         res.end();
    //     //     });
    //     // });
    // });
}