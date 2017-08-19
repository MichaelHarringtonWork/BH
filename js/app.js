var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var port = 4200;
var bodyParser = require('body-parser');
__dirname = path.resolve(path.dirname(''));


//app.use(express.static(__dirname + '/node_modules'));
//app.get('/', function (req, res, next){
 //  res.sendFile(__dirname + '/index.html'); 
    
//});
//var data;
server.listen(port);
console.log("Ther server is listening on port " + port);
app.use(bodyParser.json());
app.post('/testpost', function(request, response){
   console.log(request.body);
   //response.send(request.body.Description);
   //var data = JSON.bodyParser(request.body);
   response.send(request.body);
});

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html')
});