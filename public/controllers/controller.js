"use strict";
const app = angular.module('app', ['ngRoute']);

//routes
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'businesses.html',
        controller : 'BusinessCtrl'
    })
    .when('/categories', {
        templateUrl : 'categories.html',
        controller : 'CategoryCtrl'
    })
    .when('/users', {
        templateUrl : 'users.html',
        controller : 'UserCtrl'
    })
});

// create controllers
app.controller('BusinessCtrl',
        function BusinessCtrl ($scope, BusinessFactory) {
            $scope.businesses = BusinessFactory.businesses;
            
            $scope.addBusiness = function (business) {
                BusinessFactory.addBusiness(business);
            };

            $scope.updateBusiness = function (business) {
                BusinessFactory.updateBusiness(business);
            };
            
            $scope.removeBusiness = function (business) {
                BusinessFactory.removeBusiness(business);
            };
            
            $scope.editBusiness = function (business) {
                BusinessFactory.editBusiness(business);
            };
            
            $scope.clearNewBusiness = function (business) {
                BusinessFactory.clearNewBusiness(business);
            };

            BusinessFactory
                .getBusinesses()
                .then(function () {
                    $scope.businesses = BusinessFactory.businesses;
                });
});

app.controller('CategoryCtrl',
        function CategoryCtrl ($scope, CategoryFactory) {
            $scope.categories = CategoryFactory.categories;
            
            $scope.addCategory = function (category) {
                CategoryFactory.addCategory(category);
            };

            $scope.updateCategory = function (category) {
                CategoryFactory.updateCategory(category);
            };

            $scope.removeCategory = function (category) {
                CategoryFactory.removeCategory(category);
            };

            CategoryFactory
                .getCategories()
                .then(function () {
                    $scope.categories = CategoryFactory.categories;
                });
});

app.controller('UserCtrl',
        function UserCtrl ($scope, UserFactory) {
            $scope.users = UserFactory.users;
            
            $scope.addUser = function (category) {
                UserFactory.addUser(category);
            };

            $scope.updateUser = function (category) {
                UserFactory.updateUser(category);
            };

            $scope.removeUser = function (category) {
                UserFactory.removeUser(category);
            };

            UserFactory
                .getCategories()
                .then(function () {
                    $scope.users = UserFactory.users;
                });
});

const apiUrl = 'http://ec2-54-153-28-110.us-west-1.compute.amazonaws.com:8080/api/';

// create factories
app.factory('BusinessFactory',
function BusinessFactory () {
    BusinessFactory.businesses = [];

    BusinessFactory.addBusiness = function (business) {
        console.log('addBusiness');
        //business.invalidAdd = {
        //  name : '',
        //  phone : '',
        //  website: ''
        //}
        //validate business here
        $http.post(apiUrl + '/businesses', business.newBusiness).then((success) => refresh());
    };

    BusinessFactory.updateBusiness = function (business) {

    };

    BusinessFactory.removeBusiness = function (business) {

    };

    BusinessFactory.editBusiness = function (business) {

    };

    BusinessFactory.clearNewBusiness = function (business) {

    };



