var express = require("express");
var http = require("http");
var fs = require("fs");

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

if(!fs.existsSync("./server/config.json")) {
	console.error("Error: Configuration file doesn't exist.");
	process.exit();
}

var config = require("./server/config");

app.use(express.static('static'));
app.use("/js", express.static('client'));
app.use("/js", express.static('shared'));
app.use("/views", express.static('client/views/html'));

port = config["port"];

server.listen(port, function() {
  console.log("Server listening at: *:"+port);
});

var game = Object.create(require("./server/app"));
game.initialize(io, config);
