const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

module.exports = function(app) {
    app.get('/api/friends', function (req, res) {
        res.sendFile(path.join(__dirname, '../public', 'home.html'));
    });

    app.post('/api/friends', function (req, res) {
        res.send('POST request to the homepage');
    });
}