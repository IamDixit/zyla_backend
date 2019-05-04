"use strict";
const Chance = require('chance');
const urlModel = require('../Model/url');
const Msg = require('../Config/messageConfig');
const configUrl = require('../Config/baseUrl');
const chance = new Chance(Math.random);

var methods = {

    generateId: function (callback) {
        const number = (chance.integer({
            min: 100,
            max: 10000
        }));
        urlModel.find({
            uid: number
        }).then(res => {
            if (res.length > 0) {
                this.generateId();
            } else {
                callback(number);
            }
        }).catch(err => {
            console.log('Error while finding uid: ' + err);
            callback(0);
        })
    },

    shorten: function (URL, callback) {
        this.generateId((response) => {
            if (response) {
                let uidUrl = '';
                let rem = 0;
                let quo = response;
                while (quo > 1) {
                    rem = quo % 10;
                    uidUrl = String.fromCharCode(rem + 97) + uidUrl;
                    quo = parseInt(quo / 10);
                }

                const newUrl = new urlModel({
                    uid: response,
                    url: URL
                });
                newUrl.save((err) => {
                    if (err) {
                        console.log('Error while saving URL: ', err);
                        callback(Msg.databaseErr);
                    } else {
                        callback({
                            status: 200,
                            message: 'Url is shortened!',
                            url: configUrl.baseUrl + uidUrl
                        })
                    }
                });

            } else {
                callback(Msg.databaseErr);
            }
        })
    },

    original: function (URL, callback) {
        const myStr = URL.split(configUrl.baseUrl);
        const url = myStr[1];
        if (url) {
            let myUid = '';
            for (let i = 0; i < url.length; i++) {
                let temp = url[i].charCodeAt(0) - 97;
                myUid = myUid + temp.toString();
            }
            myUid = parseInt(myUid);
            urlModel.find({
                uid: myUid
            }).then(response => {
                if (response.length == 1)
                    callback(response);
                else {
                    callback(Msg.invalidUrl);
                }
            }).catch(err => {
                callback(Msg.databaseErr);
            });
        } else {
            callback(Msg.invalidUrl);
        }
    },

    stats: function (callback) {
        urlModel.find().then(res => {
            const total = res.length;
            let startDate = new Date();
            startDate.setHours(0, 0, 0);
            let endDate = new Date();
            endDate.setHours(23, 59, 59);
            urlModel.find({
                created: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).then(res => {
                callback({
                    status: 200,
                    message: "Stats retrived!",
                    totalService: total,
                    today: res.length
                });
            }).catch(err => {
                callback(Msg.databaseErr);
            })
        }).catch(err => {
            callback(Msg.databaseErr);
        });
    }
}

module.exports = methods;