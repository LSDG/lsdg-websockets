// ---------------------------------------------------------------------------------------------------------------------
// Brief Description of chat.controllers.js.
//
// @module chat.controllers.js
// ---------------------------------------------------------------------------------------------------------------------

function MainController(){};

// ---------------------------------------------------------------------------------------------------------------------

function PostController($scope, $http)
{
    $scope.refresh = function() {
        $http.get('/chat').success(function(data)
        {
            $scope.chat = data;
        });
    };

    $scope.sendMessage = function(name, message)
    {
        $http.post('/message', { name: name, message: message });


        // Re-update the chat window
        $scope.refresh();

        // Clear the message
        $scope.message = "";
    }; // end sendMessage

    // Refresh on page load
    $scope.refresh();
} // end PostController

// ---------------------------------------------------------------------------------------------------------------------

function LongController($scope, $http, $timeout)
{
    function poll() {
        $http.get('/chat-poll')
            .success(function(data)
            {
                $scope.chat = data;
            })
            .then(function()
            {
                $timeout(poll, 1000);
            });
    } // end poll

    $scope.sendMessage = function(name, message)
    {
        $http.post('/message', { name: name, message: message });

        // Clear the message
        $scope.message = "";
    }; // end sendMessage

    // Get the latest on initial page load
    $http.get('/chat').success(function(data)
    {
        $scope.chat = data;
    });

    // poll for changes
    poll();
} // end LongController

// ---------------------------------------------------------------------------------------------------------------------

function WSController($scope, $location)
{
    var connection = new WebSocket('ws://' + $location.host() +':3030');

    connection.onopen = function(){
        // Get the latest chat on page load
        connection.send(JSON.stringify({ type: 'get-chat' }));
    };

    connection.onmessage = function(event)
    {
        var msg = JSON.parse(event.data);

        switch(msg.type)
        {
            case 'chat-line':
                $scope.$apply(function()
                {
                    $scope.chat.unshift(msg.content);
                });
                break;

            case 'chat-full':
                $scope.$apply(function()
                {
                    $scope.chat = msg.content;
                });

                break;
        } // end switch
    };

    $scope.sendMessage = function(name, message)
    {
        var envelope = {
            type: 'message',
            content: {
                name: name,
                message: message
            }
        };
        connection.send(JSON.stringify(envelope));

        // Clear the message
        $scope.message = "";
    }; // end sendMessage

} // end WSController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('app-chat.controllers').controller('MainController', MainController);
angular.module('app-chat.controllers').controller('PostController', ['$scope', '$http', PostController]);
angular.module('app-chat.controllers').controller('LongController', ['$scope', '$http', '$timeout', LongController]);
angular.module('app-chat.controllers').controller('WSController', ['$scope', '$location', WSController]);

// ---------------------------------------------------------------------------------------------------------------------