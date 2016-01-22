var myApp = angular.module('cscApp',[]);
myApp.controller('categoryController', ['$scope', '$http',($scope,$http) => {
    var refresh = function () {
      $http.get('/api/reuseCategories').success(function(response){
        $scope.reuseCategories = response;
        $scope.newReuse = "";
        $scope.selectedReuse = {};
        $scope.addReuseError = {};
        $scope.editReuseError = {};
        console.log(response);
      });
      $http.get('/api/repairCategories').success(function(response){
        $scope.repairCategories = response;
        $scope.newRepair = "";
        $scope.selectedRepair = {};
        $scope.addRepairError = {};
        $scope.editRepairError = {};
        console.log(response);
      });
    }
    refresh();
    $scope.addReuse = function ()  {
      if (validate({name : $scope.newReuse}, $scope.reuseCategories, $scope.addReuseError) == true)
        $http.post('/api/reuseCategories', {name : $scope.newReuse}).then((success) => refresh());
    }
    $scope.updateReuse = function (id) {
      if (validate($scope.selectedReuse, $scope.reuseCategories, $scope.editReuseError) == true)
        $http.put('/api/reuseCategories/'+id, $scope.selectedReuse).then((success) => refresh());
    }
    $scope.removeReuse = function (id) {
      console.log(id);
      $http.delete('/api/reuseCategories/'+id).then((success) => refresh());
      refresh();
    }
    // gets the template to ng-include for a table row / item
    $scope.getReuseTemplate = function (reuse) {
        if (reuse._id == $scope.selectedReuse._id) return 'edit';
        else return 'display';
    };
    $scope.editReuse = function (reuse) {
      console.log('edit clicked');
      $scope.selectedReuse= angular.copy(reuse);
      $scope.editReuseError = {};
    };
    ////////////REPAIR///////////////
    $scope.addRepair = function ()  {
      if (validate({name : $scope.newRepair}, $scope.repairCategories, $scope.addRepairError) == true)
        $http.post('/api/repairCategories', {name : $scope.newRepair}).then((success) => refresh());
    }
    $scope.updateRepair = function (id) {
      if (validate($scope.selectedRepair, $scope.repairCategories, $scope.editRepairError) == true)
        $http.put('/api/repairCategories/'+id, $scope.selectedRepair).then((success) => refresh());
    }
    $scope.removeRepair = function (id) {
      console.log(id);
      $http.delete('/api/repairCategories/'+id).then((success) => refresh());
      refresh();
    }
    // gets the template to ng-include for a table row / item
    $scope.getRepairTemplate = function (reuse) {
        return (reuse._id === $scope.selectedRepair._id) ? 'editRepair' : 'displayRepair';
    };
    $scope.editRepair = function (repair) {
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
      for (var element of collection) {
        console.log('item '+item.name +' '+element.name);
        if (element.name == item.name) {
          errorField.text = item.name + " is already in the list.";
          return false;
        }
      }
      return true;
    }
  }
]);
