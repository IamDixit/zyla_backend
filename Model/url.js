"use strict";

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const  Url = new schema({

    uid: Number,
    url: String,
    created: { type: Date, default: Date.now }
    
}, { versionKey: false });

const urls = mongoose.model("urls", Url);
module.exports = urls;

