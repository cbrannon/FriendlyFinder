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

            function findAllSums() {
                friendArray.forEach(currentItem => {
                    let currentSum = currentItem.scores.reduce((a, b) => parseInt(a) + parseInt(b), 0);
                    friendSums.push(currentSum);
                });
                findClosest(currentSum, friendSums);
            }

            function findClosest(current, friends) {
                let closestDifference;
                let closestIndex;

                friends.forEach((currentItem, index) => {
                    currentDifference = Math.abs(currentItem - current);

                    if (closestDifference == undefined || currentDifference <= closestDifference) {
                        closestDifference = currentDifference;
                        closestIndex = index;
                    }
                });
                console.log(closestDifference);
                friendMatch = friendArray[closestIndex];
            }

            findAllSums();

            friendArray.push(req.body);
            res.json(friendMatch);
            res.end(fs.writeFile( path.join(__dirname, '../data', 'friends.js'), JSON.stringify(friendArray)));
        });
    });
}