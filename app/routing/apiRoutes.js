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
        fs.readFile( path.join(__dirname, '../data', 'friends.js'), 'utf8', function (err, data) {
            let friendArray = JSON.parse(data);
            friendArray.push(req.body);
            res.end(JSON.stringify(friendArray));
            res.end(fs.writeFile( path.join(__dirname, '../data', 'friends.js'), JSON.stringify(friendArray)));
        });

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