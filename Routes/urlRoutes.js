"use strict";


const express = require('express');
const url = require('../Controller/url');
const msg = require('../Config/messageConfig');

var routes = function () {
    var userRouter = express.Router();

    userRouter.route('/shorten')
        .post(function (req, res) {
            const data = req.body;
            if (data.url) {
                url.shorten(data.url, (response) => {
                    res.json(response);
                });
            } else {
                res.json(msg.invalidParams);
            }
        });

    userRouter.route('/original')
        .post(function (req, res) {
            const data = req.body;
            if (data.url) {
                url.original(data.url, (response) => {
                    res.json(response);
                });
            } else {
                res.json(msg.invalidParams);
            }
        });

    userRouter.route('/stats')
        .get(function (req, res) {
            url.stats((response) => {
                res.json(response);
            });
        });

    return userRouter;
};

module.exports = routes;