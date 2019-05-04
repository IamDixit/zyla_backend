/**
 * Backend Server startup file, handles incoming api's and mongo connection
 * @author - Abhishek Dixit < abhishek.dixit@genisys-group.com >
 */
"use strict";

const mongoose = require('mongoose');
const db = require('./Config/DbConfig');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 4000;


/**
 * Setting Up the headers for incoming requests 
 */
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
/**
 * Setting Up the middleware 
 */
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Setting Up the routers
 */
const userRouter = require('./Routes/urlRoutes.js')();
app.use('/url', userRouter);

/**
 * Server Listening
 */
app.listen(port, function () {
    console.log("Backend Server is Running on http://localhost:" + port);
});

/**
 * Connection with Db
 */
mongoose.connect(db, {
    useNewUrlParser: true
}, function (err, res) {
    if (err) {
        console.log("Error in connection: " + err);
    } else {
        console.log("Connection Established with Mongodb");
    }
});