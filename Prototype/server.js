var http = require('http');
var fs = require('fs');
var express = require('express');
var pug = require('pug');
var database = require('./firebase.js');

app = express();
app.set('view engine', 'pug');

app.get('/test_firebase', function(req, res) {
	var events = [];
	var db = database.get_connection();
	db.then(function(snapshot) {
		console.log(snapshot.val().events);
		res.render('db_test', {"events": snapshot.val().events});
	});
});

app.listen(7080, function () {
    console.log('listening on port', 7080);
});

http.createServer(function (req, res){
    if(req.url === '/index.html'){
        fs.readFile('templates/index.html',function(err,data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if(req.url === '/index.css') {
        fs.readFile('css/index.css',function(err,data) {
            res.writeHead(200, {'Content-Type': "text/css"});
            res.write(data);
            res.end();
        });
	} else {
		res.writeHead(404);
		res.write('Page not found.');
		res.end();
	}
}).listen(8080, function() {
	console.log('listening on port', 8080)
});