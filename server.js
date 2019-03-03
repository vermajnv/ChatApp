var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
user = [];
connections = [];
server.listen(process.env.PORT || 3000);
console.log('Server Running');
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected % No of Connectection :', connections.length);
    // Disconnect
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnceted : %s sockets connected', connections.length);
    });

    // Send Message

    socket.on('send message', function(data) {
        console.log(data);
        io.sockets.emit('new message', {msg : data});
    });


});

app.use(express.static(__dirname + '/asset'));
