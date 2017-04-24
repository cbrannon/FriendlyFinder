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
        // console.log(req.body);
        fs.readFile( path.join(__dirname, '../data', 'friends.js'), 'utf8', function (err, data) {
            let friendArray = JSON.parse(data);
            let currentSum = req.body.scores.reduce((a, b) => parseInt(a) + parseInt(b), 0);
            let friendSums = [];
            let friendMatch;

            function findClosestMatch() {
                let closestDifference;
                let closestIndex;

                friendArray.forEach(currentItem => {
                    let currentDifference = 0;
                    
                    currentItem.scores.forEach((currentItem, index) => {
                        currentDifference+=Math.abs(currentItem-req.body.scores[index]);
                    });

                    if (closestDifference == undefined || closestDifference > currentDifference) {
                        friendMatch=currentItem;
                    }
                });
            }
            findClosestMatch();

            friendArray.push(req.body);
            res.json(friendMatch);
            res.end(fs.writeFile( path.join(__dirname, '../data', 'friends.js'), JSON.stringify(friendArray)));
        });
    });
}