'use strict';

module.exports = function(app) {

  var handleSuccess = function(callback) {
    return function(data) {
      console.log('Mongo says: "All Good"');
      console.log(data);

      callback(data);
    };
  };

  var handleError = function(err) {
    return function(err) {
      console.log('Mongo says: "ERROR" '  + err);
    };
  };

  app.factory('crudResource', ['$http', function($http) {
    return function() {
      return {
        getTodos: function(callback) {
          $http({
            method: 'GET',
            url: 'api/get_todos'
          })
          .success(handleSuccess(callback))
          .error(handleError());
        },
        submitNewTodo: function(data, callback) {
          $http({
            method: 'POST',
            url: 'api/create_todos',
            data: data
          })
          .success(handleSuccess(callback))
          .error(handleError());
        },
        updateTodo: function(id, body, callback) {
          $http({
            method: 'PUT',
            url: 'api/update_todos',
            data: {_id : id, todo : body}
          })
          .success(handleSuccess(callback))
          .error(handleError());
        },
        deleteTodo: function(id, callback) {
          $http({
            method: 'DELETE',
            url: 'api/remove_todos' + id
          })
          .success(handleSuccess(callback))
          .error(handleError());
        }
      };
    };
  }]);

};

