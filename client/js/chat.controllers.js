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

    // poll for changes
    poll();
} // end LongController

// ---------------------------------------------------------------------------------------------------------------------

function WSController($scope)
{

} // end WSController

// ---------------------------------------------------------------------------------------------------------------------

angular.module('app-chat.controllers').controller('MainController', MainController);
angular.module('app-chat.controllers').controller('PostController', ['$scope', '$http', PostController]);
angular.module('app-chat.controllers').controller('LongController', ['$scope', '$http', '$timeout', LongController]);
angular.module('app-chat.controllers').controller('WSController', ['$scope', WSController]);

// ---------------------------------------------------------------------------------------------------------------------