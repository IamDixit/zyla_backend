"use strict";

var connection = {
    server: "mongodb+srv",
    user: "myuser",
    password: "abhi1996",
    host: "ganesha-e3pxn.mongodb.net/zyla?retryWrites=true"
}

var configString = connection.server +"://"+ connection.user +":"+ connection.password +"@"+ connection.host;


module.exports = configString;