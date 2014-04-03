//----------------------------------------------------------------------------------------------------------------------
// Websocket Handler
//
// @module websocket.js
//----------------------------------------------------------------------------------------------------------------------

var WebSocketServer = require('ws').Server;
var chat = require('./chat');

//----------------------------------------------------------------------------------------------------------------------

var wss = new WebSocketServer({port: 3030});

// Add a broadcast function
wss.broadcast = function(data)
{
    for(var i in this.clients)
        this.clients[i].send(data);
};

wss.on('connection', function(ws)
{
    ws.on('message', function(message)
    {
        message = JSON.parse(message);

        switch(message.type)
        {
            case 'message':
                chat.appendMessage(message.content);
                var envelope = {
                    type: 'chat-line',
                    content: message.content
                };

                wss.broadcast(JSON.stringify(envelope));
                break;

            case 'get-chat':
                var envelope = {
                    type: 'chat-full',
                    content: chat.getMessages()
                };

                ws.send(JSON.stringify(envelope));
        } // end switch
    });
});

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
}; // end exports

//----------------------------------------------------------------------------------------------------------------------