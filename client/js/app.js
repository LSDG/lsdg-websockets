// ---------------------------------------------------------------------------------------------------------------------
// The main angular application
//
// @module app.js
// ---------------------------------------------------------------------------------------------------------------------

angular.module('chat-app', [
    'ngRoute',
    'app-chat.controllers'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main.html',  controller: 'MainController'})
        .when('/post', { templateUrl: '/partials/chat.html',  controller: 'PostController'})
        .when('/long-polling', { templateUrl: '/partials/chat.html',  controller: 'LongController'})
        .when('/websockets', { templateUrl: '/partials/chat.html',  controller: 'WSController'})
        .otherwise({redirectTo: '/'});
}]).run(['$rootScope', '$location', function($rootScope, $location)
{
    $rootScope.chat = [];

    $rootScope.getPath = function()
    {
        return $location.path();
    }; // end getPath

    $rootScope.username = "User" + (Date.now().toString().slice(5));
}]);

angular.module('chat-app').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

// ---------------------------------------------------------------------------------------------------------------------

angular.module('app-chat.controllers', []);

// ---------------------------------------------------------------------------------------------------------------------