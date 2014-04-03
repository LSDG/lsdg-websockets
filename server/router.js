//----------------------------------------------------------------------------------------------------------------------
// Basic router
//
// @module router.js
//----------------------------------------------------------------------------------------------------------------------

var chat = require('./chat');

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    get_chat: function(request, response)
    {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(chat.getMessages()));
    },
    post_chat: function(request, response)
    {
        var message = request.body;
        chat.appendMessage(message);
        response.end();
    },
    get_chat_polling: function(request, response)
    {
        chat.waitForMessage(function(messages)
        {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(messages));
        });
    }
}; // end exports

//----------------------------------------------------------------------------------------------------------------------