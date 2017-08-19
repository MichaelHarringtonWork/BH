const SocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var app = express();
var port = 80;

var server = app.listen(port, function(){
    console.log('node.js static server listening on port: ' + port + ", with websocket listener");
});