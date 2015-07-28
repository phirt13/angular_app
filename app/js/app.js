'use strict';

require('angular/angular');
require('angular-route');

var todoApp = angular.module('todoApp', ['ngRoute']);

require('./services/CRUDResource.js')(todoApp);

require('./controllers/todo_controller.js')(todoApp);

todoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/secret', {
      templateUrl: '/templates/views/secret.html',
      controller: 'todoController'
    })
    .when('/main', {
      templateUrl: '/templates/views/main.html',
      controller: 'todoController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);



