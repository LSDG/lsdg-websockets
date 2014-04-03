//----------------------------------------------------------------------------------------------------------------------
// Simple server application for the websocket demo
//
// @module server.js
//----------------------------------------------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');
var http = require('http');

var connect = require('connect');
var urlrouter = require('urlrouter');

var router = require('./server/router');

//----------------------------------------------------------------------------------------------------------------------

var app = connect()
    .use(connect.query())
    .use(connect.urlencoded())
    .use(connect.json())
    .use(connect.static('client'))
    .use(urlrouter(function(app)
    {
        app.get('/chat', router.get_chat);
        app.get('/chat-poll', router.get_chat_polling);
        app.post('/message', router.post_chat);
    }))
    .use(function(req, res){
        var indexStream = fs.createReadStream(path.resolve(path.join('client', 'index.html')));
        indexStream.pipe(res);
    });

http.createServer(app).listen(3000);

//----------------------------------------------------------------------------------------------------------------------