"use strict";
const cscApp = angular.module('cscApp', ['ngRoute']);
const apiUrl = 'http://ec2-54-153-28-110.us-west-1.compute.amazonaws.com:3000/api';
// configure our routes
cscApp.config(function($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl : 'businesses.html',
          controller  : 'businessController'
      })
      .when('/categories', {
          templateUrl : 'categories.html',
          controller  : 'categoryController'
      })
});

// create the controller and inject Angular's $scope
cscApp.controller('mainController', function($scope) {
});

cscApp.controller('businessController', function($scope, $http) {
  function init () {
    $http.get(apiUrl + '/reuse').success(response => {
      $scope.categories = response;
      console.log(response);
    });
    $http.get(apiUrl + '/repair').success(response => {
      $scope.repairCategories = response;
      console.log(response);
    });
    $scope.newReuseCategories = [];
    $scope.newRepairCategories = [];
    $scope.editReuseCategories = [];
    $scope.editRepairCategories = [];
    $scope.showAddPanel = false;
  }
  let refresh = () => {
    $http.get(apiUrl + '/businesses').success((response)=>{
      $scope.businesses = response;
      $scope.clearNewBusiness();
      $scope.selectedBusiness = {};
      console.log(response);
    });
  }
  init();
  refresh();
  $scope.addBusiness = () => {
    console.log('addBusiness');
    $scope.invalidAdd = {
      name : '',
      phone :'',
      website :''
    }
    //if (validate ($scope.newBusiness,$scope.invalidAdd) == true)
      $http.post(apiUrl + '/businesses', $scope.newBusiness).then((success) => refresh());
  }
  $scope.updateBusiness = () => {
    $scope.selectedBusiness.reuseCategories = $scope.editReuseCategories.slice(0);
    $scope.selectedBusiness.repairCategories = $scope.editRepairCategories.slice(0);
    console.log ('updating');
    console.log ($scope.selectedBusiness);
    console.log($scope.editReuseCategories.slice(0));
        //if (validate($scope.selectedBusiness, $scope.invalid) == true)
          $http.put(apiUrl + '/businesses/'+$scope.selectedBusiness._id, $scope.selectedBusiness).then((success) => refresh());
  }
  $scope.removeBusiness = id => {
    console.log(id);
    $http.delete(apiUrl + '/businesses/'+id).then((success) => refresh());
    refresh();
  }
  $scope.clearNewBusiness = () => {
    $scope.newBusiness = {
      name : "",
      phone : "",
      website : "",
      active: false,
      rating: 0
    };
  }
  $scope.getTemplate = business => {
    try {
      if (business._id === $scope.selectedBusiness._id) return 'edit';
      else return 'display';
    } catch (e) {return 'display';}
  };
  $scope.editBusiness =  business => {
    $scope.invalid = {
      name : '',
      phone :'',
      website :''
    }
    console.log('edit clicked');
      $scope.selectedBusiness = angular.copy(business);
      $scope.editReuseCategories = $scope.selectedBusiness.reuseCategories.slice(0);;
      $scope.editRepairCategories = $scope.selectedBusiness.repairCategories.slice(0);;
  };
  function validate(business, errorMessage) {
      return true;
      console.log('validating');
      console.log(business);
      errorMessage.name = '';
      errorMessage.phone = '';
      errorMessage.website = '';

      let returnValue = true;
      if (business.name == '') {
        errorMessage.name = 'Name cannot be blank.';
        returnValue = false;
      }
      const phoneNumber = /^(1-?)?(([2-9]\d{2})|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/
      if(phoneNumber.test(business.phone) == false){
        errorMessage.phone = 'Must be a valid US phone number such as 555-555-5555.';
        returnValue =  false;
      }
      const url = /http?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if(url.test(business.website) == false){
        errorMessage.website = 'Must be a valid url beginning with http://';
        returnValue = false;
      }
      for (let b of $scope.businesses) {
        if (business._id == b._id)
          continue;
        if (business.name == b.name) {
          errorMessage.name = b.name+' is already in the database.';
          returnValue = false;
        }
        if (business.phone == b.phone) {
          errorMessage.phone = b.phone+' is already in the database.';
          returnValue = false;
        }
        if (business.website == b.website) {
          errorMessage.website = b.website+' is already in the database.';
          returnValue = false;
        }
      }
      return returnValue;
  }
  $scope.addCategory =  (selected, collection) => {
console.log(selected);
console.log(collection);
    for (let item of collection)
      if (item == selected)
        return;
    collection.push (selected);
    console.log(collection);
  }
  $scope.removeCategory = (selected, collection) => {
    for(let i = 0; i < collection.length; i++) {
        if(collection[i] == selected) {
            collection.splice(i, 1);
            break;
        }
    }
    console.log(collection);
  }
});

cscApp.controller('categoryController', function($scope, $http) {
      let refresh = function () {
        $http.get(apiUrl + '/reuseCategories').success( response => {
          $scope.reuseCategories = response;
          $scope.newReuse = "";
          $scope.selectedReuse = {};
          $scope.addReuseError = {};
          $scope.editReuseError = {};
          console.log(response);
        });
        $http.get(apiUrl + '/repairCategories').success(response => {
          $scope.repairCategories = response;
          $scope.newRepair = "";
          $scope.selectedRepair = {};
          $scope.addRepairError = {};
          $scope.editRepairError = {};
          console.log(response);
        });
      }
      refresh();
      $scope.addReuse =  () => {
        if (validate({name : $scope.newReuse}, $scope.reuseCategories, $scope.addReuseError) == true)
          $http.post(apiUrl + '/reuseCategories', {name : $scope.newReuse}).then((success) => refresh());
      }
      $scope.updateReuse =  id => {
        if (validate($scope.selectedReuse, $scope.reuseCategories, $scope.editReuseError) == true)
          $http.put(apiUrl + '/reuseCategories/'+id, $scope.selectedReuse).then((success) => refresh());
      }
      $scope.removeReuse =  id => {
        console.log(id);
        $http.delete(apiUrl + '/reuseCategories/'+id).then((success) => refresh());
        refresh();
      }
      // gets the template to ng-include for a table row / item
      $scope.getReuseTemplate =  reuse => {
          if (reuse._id == $scope.selectedReuse._id) return 'edit';
          else return 'display';
      };
      $scope.editReuse =  reuse => {
        console.log('edit clicked');
        $scope.selectedReuse= angular.copy(reuse);
        $scope.editReuseError = {};
      };
      ////////////REPAIR///////////////
      $scope.addRepair =  () => {
        if (validate({name : $scope.newRepair}, $scope.repairCategories, $scope.addRepairError) == true)
          $http.post(apiUrl + '/repairCategories', {name : $scope.newRepair}).then((success) => refresh());
      }
      $scope.updateRepair = id => {
        if (validate($scope.selectedRepair, $scope.repairCategories, $scope.editRepairError) == true)
          $http.put(apiUrl + '/repairCategories/'+id, $scope.selectedRepair).then((success) => refresh());
      }
      $scope.removeRepair = id => {
        console.log(id);
        $http.delete(apiUrl + '/repairCategories/'+id).then((success) => refresh());
        refresh();
      }
      // gets the template to ng-include for a table row / item
      $scope.getRepairTemplate =  reuse => {
          return (reuse._id === $scope.selectedRepair._id) ? 'editRepair' : 'displayRepair';
      };
      $scope.editRepair =  repair => {
        console.log('edit clicked '+ repair.name);
          $scope.selectedRepair= angular.copy(repair);
          console.log ($scope.selectedRepair.name);
      };
      function validate (item, collection, errorField) {
        console.log('validating');
        if (item.name == "" || item.name == undefined) {
          errorField.text = "Category cannot be blank";
          return false;
        }
        for (let element of collection) {
          console.log('item '+item.name +' '+element.name);
          if (element.name == item.name) {
            errorField.text = item.name + " is already in the list.";
            return false;
          }
        }
        return true;
      }
});
