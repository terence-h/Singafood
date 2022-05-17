"use strict";

// Declare necessary node modules/JS for website
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routeRestaurants = require('./routes/routeRestaurants');
const routeReviews = require('./routes/routeReviews');
const routeUsers = require('./routes/routeUsers');

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

// Tell server to use session with the options for sessions/cookies
app.use(session({
    key: 'user_id',
    secret: 'cliDsd98AxL#G3a',
    resave: false,
    saveUninitialized: false,
    maxAge: 86400000 * 30, // 30 days
    cookie: {
        expires: 86400000 * 30, // 30 days
        httpOnly: false
    }
}));

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Call all functions in the routes to initialize them
routeRestaurants.routeRestaurants(app);
routeReviews.routeReviews(app);
routeUsers.routeUsers(app);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening at http://%s:%s | NOTE: 'npm run server' for auto restart", host, port);
});