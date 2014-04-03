//----------------------------------------------------------------------------------------------------------------------
// Brief description for chat module.
//
// @module chat
//----------------------------------------------------------------------------------------------------------------------

function ChatMessages() {
    this.messages = [];

    this.waitingOnMessages = [];
}

ChatMessages.prototype.getMessages = function()
{
    return this.messages;
};

ChatMessages.prototype.appendMessage = function(message)
{
    var self = this;
    this.messages.push(message);

    // Empty the queue of waiting callbacks
    this.waitingOnMessages.forEach(function(callback)
    {
        callback(self.messages);
    });

    // The queue is clear
    this.waitingOnMessages = [];
};

ChatMessages.prototype.waitForMessage = function(callback)
{
    var self = this;
    this.waitingOnMessages.push(callback);

    setTimeout(function()
    {
        var idx = self.waitingOnMessages.indexOf(callback);
        if(idx >= 0)
        {
            self.waitingOnMessages.splice(idx, 1);
            callback(self.messages);
        } // end if
    }, 30000)
};

//----------------------------------------------------------------------------------------------------------------------

module.exports = new ChatMessages();

//----------------------------------------------------------------------------------------------------------------------