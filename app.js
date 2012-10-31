var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
app.listen(8080, function() {
        console.log("--- app.listen");
});