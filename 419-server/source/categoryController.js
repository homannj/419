"use strict";
let myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope', '$http',($scope,$http) => {
    var refresh = () => {
      $http.get('/api/categories').success(function(response){
        $scope.categories = response;
        $scope.category = "";
        $scope.selectedCategory = {};
        console.log(response);
      });
    }
    refresh();
    $scope.addCategory = () => {
      console.log($scope.category);
      $http.post('/api/categories', $scope.category).then((success) => refresh());
    }
    $scope.checkKey = () => {
      if (event.which == 13)
        $scope.addCategory();
    }
    $scope.updateCategory = (id) => {
      let category = null;
      for (category of $scope.categories)
        if (category._id == id) {
          $http.put('/api/categories/'+id, category).then((success) => refresh());
          break;
        }
    }
    $scope.removeCategory = (id) => {
      console.log(id);
      $http.delete('/api/categories/'+id).then((success) => refresh());
      refresh();
    }
    $scope.clearInput = () => {
      $scope.category = "";
    }
    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (category) {
        if (category._id === $scope.selectedCategory._id) return 'edit';
        else return 'display';
    };
    $scope.editCategory = function (category) {
      console.log('edit clicked');
        $scope.selectedCategory= angular.copy(category);
    };

  }
]);
