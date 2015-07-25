'use strict';

module.exports = function(app) {

  app.controller('todoController', ['$scope', 'crudResource', function($scope, crudResource) {

    var Http = crudResource();

    function populateMongoTodo() {
      Http.getTodos(function(data) {
        $scope.todos = data;

        for(var i = 0; i < $scope.todos.length; i++) {
          $scope.todos[i].update = false;
        }
      });
    }

    populateMongoTodo();

    $scope.submitForm = function(newTodo) {
      Http.submitNewTodo(newTodo, function(data) {
        populateMongoTodo();
      });
    };

    $scope.editTodo = function(todoID, todoBody) {
      Http.updateTodo(todoID, todoBody, function(data) {
      });

      return function(todoObject) {
        todoObject.update = false;
      };
    };

    $scope.removeTodo = function(todoID) {
      Http.deleteTodo(todoID, function(data) {
        populateMongoTodo();
      });
    };

  }]);

};
