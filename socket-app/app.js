var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 4200
    });
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));

var currentTimer = null;
var data = null;
var currentIndex = 0;
var numElems = 0;

function sendData(data) {
    wss.broadcast(JSON.stringify(data));
}

function sendUpdate() {
    if (currentIndex == numElems-1) {
        currentIndex = 0;
    } else {
        currentIndex++
    }
    
    sendData(data[currentIndex]);
    
    var nextIndex = currentIndex == numElems-1 ? 0 : currentIndex + 1;
    
    var waitTime = Date.parse(data[currentIndex].currentDateTime) -
        Date.parse(data[nextIndex].currentDateTime);
    
    currentTimer = setTimeout(sendUpdate, waitTime);
}

app.post('/updateData', function(request, response){
    if (currentTimer != null) {
        clearTimeout(currentTimer);
    }
    
    currentIndex = 0;
    data = request.body;
    numElems = data.length;
    
    if (numElems < 1) {
        response.status(500);
        response.send("NO ELEMENTS");
    }
    
    var waitTime = Date.parse(data[currentIndex].currentDateTime) -
        Date.parse(data[1].currentDateTime);

    sendData(data[currentIndex]);
    
    currentTimer = setTimeout(sendUpdate, waitTime);
    
    response.send("OK");
});

app.use(express.static('public'));

app.listen(8080);
 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
 
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};
 
wss.on('connection', function(ws) {
    console.log("connected");
});